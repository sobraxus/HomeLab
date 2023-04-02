#Imported libraries
import threading #importing the threading module
import time #importing time library
import sys

#Variable Definitions
engine_Started = False #Boolean variable to check if the engine is running or not

#Create an time_Interval variable and loop for coutning each second
def count_time_Interval(): #function to count the time interval
    global time_Interval #Creates time_Interval as global variable
    time_Interval = 0 #Sets time_Interval to 0
    while engine_Started == True: #For as long as the engine is running
        time.sleep(1) #Wait 1 second
        time_Interval += 1 #Increment time_Interval time variable by 1

while True: #For as long as the game is not over
    #time_Thread = threading.Thread(target=count_time_Interval) #Creates a new thread setting the target variable to the count_time_Interval function
    time_Thread = threading.Thread(target=count_time_Interval) #time_Thread for testing try-except

    user_Input = input(">").title() #Gets user input and converts it to a title case

    if (user_Input == "Quit"):
        break #If the user input is "Quit", break the loop
    elif (user_Input == "Help"):
        print("Start - Start the Car\nStop - Stop the Car\nQuit- End Game") #Prints the help message
    elif (user_Input == "Start"):
        if engine_Started: #If the engine is already running
            print(f"Car already Started") #Prints a message if the car is already started
        else:
            engine_Started = True #Sets the engine_Started variable to True
            try:
                time_Thread.start() #Start the thread (begins counting each second)
            except Exception as e:
                print(f"Error: {e}")
                sys.exit(1) #If the thread cannot be started, break the loop
            print("Car Started") #Prints a message if the car is started
    elif (user_Input == "Stop"):
        if not engine_Started: #If the engine is not running
            print(f"Car already Stopped") #Prints a message if the car is already stopped
        else:
            engine_Started = False #Sets the engine_Started variable to False
            time_Thread.daemon = True #Sets the daemon variable to True
            print(f"Car Stopped, driving for {time_Interval} Seconds") #Prints a message that the car is stopped  and how long it has been driving for   
    else:
        print("I don't understand that command, use \"help\" for a list of commands") #Prints a message if the user input is not recognized