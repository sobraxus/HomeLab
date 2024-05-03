import argparse
import warnings
from quantile_forest import RandomForestQuantileRegressor  # Import RandomForestQuantileRegressor
from sklearn.metrics import log_loss
import numpy as np
import pandas as pd
import flwr as fl
import QRF_Utils

if __name__ == "__main__":
    N_CLIENTS = 2

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

    (X_train, y_train),(X_test, y_test) = QRF_Utils.load_Data()

    # Further split the training data into partitions
    X_partitions = np.array_split(X_train, N_CLIENTS)
    y_partitions = np.array_split(y_train, N_CLIENTS)

    # Now you can access a specific partition like this:
    X_partition = X_partitions[partition_id]
    y_partition = y_partitions[partition_id]

    model = RandomForestQuantileRegressor()  # Initialize RandomForestQuantileRegressor

    QRF_Utils.set_initial_params(model)

    class MnistClient(fl.client.NumPyClient):
        def get_parameters(self, config):  # type: ignore
            return QRF_Utils.get_model_parameters(model)

        def fit(self, parameters, config):  # type: ignore
            QRF_Utils.set_model_params(model, parameters)
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                model.fit(X_train, y_train)
            print(f"Training finished for round {config['server_round']}")
            return QRF_Utils.get_model_parameters(model), len(X_train), {}

        def evaluate(self, parameters, config):  # type: ignore
            QRF_Utils.set_model_params(model, parameters)
            loss = log_loss(y_test, model.predict(X_test))
            accuracy = model.score(X_test, y_test)
            return loss, len(X_test), {"accuracy": accuracy}
    
    fl.client.start_client(
        server_address="127.0.0.1:8080",
        client=MnistClient().to_client()
    )
