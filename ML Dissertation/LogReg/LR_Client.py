import warnings
import flwr as fl
import numpy as np

from sklearn.linear_model import LogisticRegression
from sklearn.metrics import log_loss

import LR_Utils as utils

if __name__ == "__main__":

    (X_train, y_train), (X_test, y_test) = utils.load_Data()

    partition_id = np.random.choice(10)
    (X_train, y_train) = utils.partition(X_train, y_train, 10)[partition_id]


model = LogisticRegression(
    penalty="l2",
    max_iter=1,  # local epoch
    warm_start=True,  # prevent refreshing weights when fitting
)

utils.set_initial_params(model)

class MnistClient(fl.client.NumPyClient):
    def get_parameters(self, config): 
        return utils.get_model_parameters(model)

    def fit(self, parameters, config): 
        utils.set_model_params(model, parameters)
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            model.fit(X_train, y_train)
        print(f"Training finished for round {config['server_round']}")
        return utils.get_model_parameters(model), len(X_train), {}

    def evaluate(self, parameters, config):  
        utils.set_model_params(model, parameters)
        loss = log_loss(y_test, model.predict_proba(X_test))
        accuracy = model.score(X_test, y_test)
        return loss, len(X_test), {"accuracy": accuracy}
    
fl.client.start_numpy_client(
    server_address="127.0.0.1:8080",
    client= MnistClient()
)