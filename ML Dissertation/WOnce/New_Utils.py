import numpy as np
from sklearn.linear_model import LogisticRegression
import pandas as pd
from sklearn.model_selection import train_test_split
from flwr.common import NDArrays



def get_model_parameters(model: LogisticRegression) -> NDArrays:
    """Returns the parameters of a sklearn LogisticRegression model."""
    if model.fit_intercept:
        params = [
            model.coef_,
            model.intercept_,
        ]
    else:
        params = [
            model.coef_,
        ]
    return params

def load_Data():
    fds = pd.read_csv(r"C:\Users\adamc\Work\HomeLab\ML Dissertation\Datasets\UNSW-NB15\UNSW_NB15_testing-set.csv")
    
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


def set_model_params(model: LogisticRegression, params: NDArrays) -> LogisticRegression:
    """Sets the parameters of a sklean LogisticRegression model."""
    model.coef_ = params[0]
    if model.fit_intercept:
        model.intercept_ = params[1]
    return model


def set_initial_params(model: LogisticRegression):
    """Sets initial parameters as zeros Required since model params are uninitialized
    until model.fit is called.

    But server asks for initial parameters from clients at launch. Refer to
    sklearn.linear_model.LogisticRegression documentation for more information.
    """
    n_classes = 2  # MNIST has 10 classes
    n_features = 200  # Number of features in dataset (Note: training: 204 Testing: 200)
   


    model.classes_ = np.array([i for i in range(2)])
    model.coef_ = np.zeros((n_classes, n_features))
    if model.fit_intercept:
        model.intercept_ = np.zeros((n_classes,))