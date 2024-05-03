#--- Data Processing ---#
import os, math
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from typing import Tuple, Union, List
#--- SKLEARN LIBRARIES ---#
from sklearn import metrics, preprocessing
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier, GradientBoostingClassifier, RandomForestRegressor
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.metrics import mean_squared_error, f1_score
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import RobustScaler


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
    print("get_model_params shapes:", [p.shape for p in params])
    return params


def set_model_params(
    model: LogisticRegression, params: LogRegParams
) -> LogisticRegression:
    """Sets the parameters of a sklean LogisticRegression model."""
    print("set_model_params shapes:", [p.shape for p in params])
    print("model.coef_ shape:", model.coef_.shape)
    if model.fit_intercept:
        print("model.intercept_ shape:", model.intercept_.shape)
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
    n_classes = 10  # MNIST has 10 classes
    n_features = 194  # Number of features in dataset
    model.classes_ = np.array([i for i in range(10)])

    model.coef_ = np.zeros((n_classes, n_features))
    if model.fit_intercept:
        model.intercept_ = np.zeros((n_classes))


def load_Data() -> Dataset:

    #Loading Datasets
    trainDF = pd.read_csv(r"C:\Users\adamc\Work\HomeLab\ML Dissertation\Datasets\UNSW-NB15\UNSW_NB15_training-set.csv")
    testDF = pd.read_csv(r"C:\Users\adamc\Work\HomeLab\ML Dissertation\Datasets\UNSW-NB15\UNSW_NB15_testing-set.csv")

    #Dropping null and duplicate values

    #Create an if statement for if there are any null values or duplicates in trainDF and drop them if true
    if(trainDF.isnull().values.sum() != 0):
        trainDF = trainDF.dropna()
    
    if(trainDF.nunique().values.sum() != 0):
        trainDF = trainDF.drop_duplicates()

    #Dropping redundant columns
    trainDF.drop(labels="id", axis=1, inplace=True)
    trainDF.drop(labels="label", axis=1, inplace=True)

    testDF.drop(labels="id", axis=1, inplace=True)
    testDF.drop(labels="label", axis=1, inplace=True)
    
    #Apply one-hot encoding to 'proto','service','state','attack_cat' columns
    enc = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
    enc.fit(trainDF[['proto','service','state','attack_cat']])  # Fit encoder on training data

    train_encoded = enc.transform(trainDF[['proto','service','state','attack_cat']])
    test_encoded  = enc.transform(testDF[['proto','service','state','attack_cat']])

    # Replace 'proto','service','state','attack_cat' column with encoded data
    trainDF = pd.concat([trainDF.drop(['proto','service','state','attack_cat'], axis=1), pd.DataFrame(train_encoded, columns=enc.get_feature_names_out(['proto','service','state','attack_cat']))], axis=1)
    testDF  = pd.concat([testDF.drop(['proto','service','state','attack_cat'],  axis=1), pd.DataFrame(test_encoded,  columns=enc.get_feature_names_out(['proto','service','state','attack_cat']))], axis=1)
    

    #Create classes variable listing all outcomes of dataset
    class_name = ['attack_cat_Analysis',
    'attack_cat_Backdoor',
    'attack_cat_DoS',
    'attack_cat_Exploits',
    'attack_cat_Fuzzers',
    'attack_cat_Generic',
    'attack_cat_Normal',
    'attack_cat_Reconnaissance',
    'attack_cat_Shellcode',
    'attack_cat_Worms']

    # Select everything other than classes
    x_train = trainDF.drop(columns=class_name)
    x_test = testDF.drop(columns=class_name)
    # Select only classes
    y_test = testDF[class_name]
    y_train = trainDF[class_name]

     
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