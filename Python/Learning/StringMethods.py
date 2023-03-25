biscuit = 'Rich Tea BisCuit'
print('Amount of Characters: '+ str((len(biscuit)))) #Count the number of characters in the string
print('ALL CAPS: '+ (biscuit.upper())) #Prints all the characters in the string in upper case (All Upper Case)
print('ALL CAPS: '+ (biscuit.lower())) #Prints all the characters in the string in lower case (All lowercase)
print('ALL CAPS: '+ (biscuit.title())) #Prints all the characters in the string in title case (Capitalize the first letter of each word)
print('Index Value of T: '+ str((biscuit.find('T')))) #Prints the index value of the character
print('Replace the Rich with the Poor: '+ biscuit.replace('Rich', 'Poor')) #Replace the Rich with the Poor (replace with value)
print('Is this Rich Tea?: ' + str(('Rich Tea' in biscuit))) #Checks if the string contains the value 
