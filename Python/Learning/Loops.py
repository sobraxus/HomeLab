'''-----------------------------------------------------------------------------------------------------------------------------------------------'''
'''While Loops'''
sunny = True
while (sunny == True):
    print("It's still sunny!")
    is_sunny = input("Is it sunny (yes/no)? " ).upper()
    if (is_sunny == "YES"):
        sunny = True
    else:
        sunny = False
        print("It's not sunny!");

i = 0
while i <= 5:
    print (i)
    i = i + 1

i = 1
j = int(input("How Big of a grid would you like? "))
num = j-2
while i <= (j - i):
    while j >= (i - j-num):
        print ('i' * i, 'j' * j)
        i = i + 1
        j = j - 1


'''-----------------------------------------------------------------------------------------------------------------------------------------------'''
'''For Loops'''
for item in 'string':
    print (item)
for item in ['string','adam','john']:
    print (item)
for item in range(0,11,2):
    print (item)

prices = [10,20,30]
total = 0
for i in prices:
    total += i
print(total)



'''-----------------------------------------------------------------------------------------------------------------------------------------------'''
'''Nested Loops'''
for x in range(0,10): #10 iterations
    for y in range(0,10): #10 iterations for each single iteration of x
        print (f'({x},{y})')
numbers = [2,2,2,6,6]
for x in numbers: #10 iterations
        output = ''
        print (x)
        for y in range(x):
            print (f'({x},{y})')
            output += 'x'
        print (output)

for i in range(0,1):
    for j in range(0,5):
        print (f'{j}')