import numpy as np
from quantile_forest import RandomForestQuantileRegressor  # Import RandomForestQuantileRegressor
import pandas as pd
from sklearn.model_selection import train_test_split
from flwr.common import NDArrays

def get_model_parameters(model: RandomForestQuantileRegressor) -> NDArrays:
    """Returns the parameters of a sklearn RandomForestQuantileRegressor model."""
    params = [
        model.estimator_samples_,
        model.estimator_features_,
        model.estimator_
    ]
    return params

def load_Data():
    fds = pd.read_csv(r"C:\Users\adamc\Work\HomeLab\ML Dissertation\Datasets\UNSW-NB15\UNSW_NB15_training-set.csv")
    
    if(fds.isnull().values.sum() != 0):
        fds = fds.dropna()
    
    if(fds.nunique().values.sum() != 0):
        fds = fds.drop_duplicates()
    
    fds.drop(labels="id", axis=1, inplace=True)
    
    fds = pd.get_dummies(fds, columns=['proto', 'service', 'state', 'attack_cat'])

    X = fds.drop('label', axis=1)
    y = fds['label']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    return (X_train, y_train), (X_test, y_test)

def set_model_params(model: RandomForestQuantileRegressor, params: NDArrays) -> RandomForestQuantileRegressor:
    """Sets the parameters of a sklean RandomForestQuantileRegressor model."""
    model.estimator_samples_ = params[0]
    model.estimator_features_ = params[1]
    model.estimator_ = params[2]
    return model

def set_initial_params(model: RandomForestQuantileRegressor):
    """Sets initial parameters as zeros Required since model params are uninitialized
    until model.fit is called.

    But server asks for initial parameters from clients at launch. Refer to
    sklearn.ensemble.RandomForestRegressor documentation for more information.
    """
    n_classes = 2  # MNIST has 10 classes
    n_features = 204  # Number of features in dataset
    n_estimators = 100  # Default number of estimators in RandomForestQuantileRegressor

    model.classes_ = np.array([i for i in range(2)])
