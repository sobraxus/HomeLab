#--- Data Processing ---#
import os, math
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import openml
from typing import Tuple, Union, List

#--- SKLEARN LIBRARIES ---#
from sklearn import metrics, preprocessing
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier, GradientBoostingClassifier, RandomForestRegressor
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.metrics import mean_squared_error, f1_score

XY = Tuple[np.ndarray, np.ndarray]
Dataset = tuple[XY, XY]
LogRegParams = Union[XY, tuple[np.ndarray]]
XYList = List[XY]


def get_model_parameters(model: LogisticRegression) -> LogRegParams:
    """Returns the paramters of a sklearn LogisticRegression model."""
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


def set_model_params(
    model: LogisticRegression, params: LogRegParams
) -> LogisticRegression:
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
    n_features = 784  # Number of features in dataset
    model.classes_ = np.array([i for i in range(10)])

    model.coef_ = np.zeros((n_classes, n_features))
    if model.fit_intercept:
        model.intercept_ = np.zeros((n_classes,))


def load_Data() -> Dataset:

    trainDF = pd.read_csv(r"C:\HomeLab\ML Dissertation\Datasets\UNSW-NB15\UNSW_NB15_training-set.csv")
    testDF = pd.read_csv(r"C:\HomeLab\ML Dissertation\Datasets\UNSW-NB15\UNSW_NB15_testing-set.csv")

    trainDF = trainDF.dropna()
    trainDF = trainDF.drop_duplicates()

    testDF = testDF.dropna()
    testDF = testDF.drop_duplicates()
    
    trainDF.drop(labels="id", axis=1, inplace=True)
    trainDF.drop(labels="label", axis=1, inplace=True)

    testDF.drop(labels="id", axis=1, inplace=True)
    testDF.drop(labels="label", axis=1, inplace=True)

    
    #split trainDF and testDF into x_train, y_train, x_test, y_test
    x_train, y_train = trainDF.iloc[:, 1:].values, trainDF.iloc[:, -1].values
    x_test, y_test = testDF.iloc[:, 1:].values, testDF.iloc[:, -1].values
    # First 60000 samples consist of the train set
    x_train, y_train = x_train[:60000], y_train[:60000]
    x_test, y_test = x_test[:60000], y_test[:60000] 

    return (x_train, y_train), (x_test, y_test)
   


def shuffle(X: np.ndarray, y: np.ndarray) -> XY:
    """Shuffle X and y."""
    rng = np.random.default_rng()
    idx = rng.permutation(len(X))
    return X[idx], y[idx]


def partition(X: np.ndarray, y: np.ndarray, num_partitions: int) -> XYList:
    """Split X and y into a number of partitions."""
    return list(
        zip(np.array_split(X, num_partitions), np.array_split(y, num_partitions))
    )