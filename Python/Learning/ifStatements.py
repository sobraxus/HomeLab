temp = str(input("Is it hot or cold today?: "))
temp = temp.title()
if (temp == "Hot"):
    print("It's hot, drink water!")
elif (temp == "Cold"):
    print("It's cold, drink coffee!")
else: print("It's a lovely day!")


house_price = int(1000000)
CreditScore = int(input("Enter your Credit Score: "))
if (CreditScore >= 890):
    deposit = house_price * 0.10
else: deposit = house_price * 0.20
print (f"Total House price: £{house_price}", f"Deposit: £{round(deposit)}")

#A 1
#B 2345
#C 1234

