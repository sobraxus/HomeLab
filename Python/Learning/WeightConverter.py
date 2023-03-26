import math
weight = float(input("Enter weight: "))
type = input("Is this (L)bs or (K)gs?: ").upper()
if type == "L":
    print (f"Your weight in Kilograms is: {math.floor(weight * 0.453592)}")
elif type == "K":
    print (f"Your weight in lbs is: {math.ceil(weight / 0.453592)}")