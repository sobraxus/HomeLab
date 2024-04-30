import flwr as fl
import New_Utils
import pandas as pd
from flwr.common import NDArrays, Scalar
from sklearn.metrics import log_loss
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from typing import Dict, Tuple, Optional

def fit_round(server_round: int) -> Dict:
    """Send round number to client."""
    return {"server_round": server_round}


def get_evaluate_fn(model: LogisticRegression):
    """Return an evaluation function for server-side evaluation."""
    (X_train, y_train),(X_test, y_test) = New_Utils.load_Data()

    def evaluate(
        server_round: int, parameters: NDArrays, config: Dict[str, Scalar]
    ) -> Optional[Tuple[float, Dict[str, Scalar]]]:
        New_Utils.set_model_params(model, parameters)
        loss = log_loss(y_test, model.predict_proba(X_test))
        accuracy = model.score(X_test, y_test)
        shape = model.coef_.shape, model.intercept_.shape
        return loss, {"accuracy": accuracy}

    return evaluate

# Start Flower server for three rounds of federated learning
if __name__ == "__main__":
    model = LogisticRegression()
    New_Utils.set_initial_params(model)
    strategy = fl.server.strategy.FedAvg(
        min_available_clients=5,
        evaluate_fn=get_evaluate_fn(model),
        on_fit_config_fn=fit_round
    )
    fl.server.start_server(server_address="127.0.0.1:8080", strategy=strategy, config=fl.server.ServerConfig(num_rounds=250))