#UP2009045
import argparse
import warnings
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import log_loss
import numpy as np
import pandas as pd
import flwr as fl
import New_Utils

if __name__ == "__main__":
    N_CLIENTS = 50

    parser = argparse.ArgumentParser(description="Flower")
    parser.add_argument(
        "--partition-id",
        type=int,
        choices=range(0, N_CLIENTS),
        required=True,
        help="Specifies the artificial data partition",
    )
    args = parser.parse_args()
    partition_id = args.partition_id

    (X_train, y_train),(X_test, y_test) = New_Utils.load_Data()

    # Further split the training data into partitions
    X_partitions = np.array_split(X_train, N_CLIENTS)
    y_partitions = np.array_split(y_train, N_CLIENTS)

    # Now you can access a specific partition like this:
    X_partition = X_partitions[partition_id]
    y_partition = y_partitions[partition_id]

    #dataset = fds.load_partition(partition_id, "train").with_format("numpy")
    #X, y = dataset["image"].reshape((len(dataset), -1)), dataset["label"]

    #X_train, X_test = X[: int(0.8 * len(X))], X[int(0.8 * len(X)) :]
    #y_train, y_test = y[: int(0.8 * len(y))], y[int(0.8 * len(y)) :]

    model = LogisticRegression(
    penalty="l2",
    max_iter=1,  # local epoch
    warm_start=True,  # prevent refreshing weights when fitting
)

New_Utils.set_initial_params(model)

class FL(fl.client.NumPyClient):
    def get_parameters(self, config):  # type: ignore
        return New_Utils.get_model_parameters(model)

    def fit(self, parameters, config):  # type: ignore
        New_Utils.set_model_params(model, parameters)
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            model.fit(X_train, y_train)
        print(f"Training finished for round {config['server_round']}")
        return New_Utils.get_model_parameters(model), len(X_train), {}

    def evaluate(self, parameters, config):  # type: ignore
        New_Utils.set_model_params(model, parameters)
        loss = log_loss(y_test, model.predict_proba(X_test))
        accuracy = model.score(X_test, y_test)
        shape = model.coef_.shape, model.intercept_.shape
        return loss, len(X_test), {"accuracy": accuracy}
    
fl.client.start_client(
    server_address="127.0.0.1:8080",
    client=FL().to_client()
)
