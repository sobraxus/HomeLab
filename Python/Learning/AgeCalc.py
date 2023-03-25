from datetime import date
today = date.today() 
Age = int(input("Enter your age: "))
Date =  today.year - Age

print("Your age is " + str(Date))

LBS = int(input("Enter your weight(LBS): "))
print("Your Weight in KG is " + str(LBS * 0.45359237))

#Create neural network model for threat detection
