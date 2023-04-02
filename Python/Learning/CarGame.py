#Imported libraries
import threading
import time

#Variable Definitions
end = False
x = False
def count_interval():
    global interval
    interval = 0
    while x == True:
        time.sleep(1)
        interval += 1
#Creat time Loop

while True:
    t = threading.Thread(target=count_interval)
    user_Input = input(">").title()

    if (user_Input == "Quit"):
        break
    elif (user_Input == "Help"):
        print("Start - Start the Car\nStop - Stop the Car\nQuit- Exit Game")
    elif (user_Input == "Start"):
        if x:
            print(f"Car already Started")
        else:
            x = True
            t.start()
            print("Car Started")
    elif (user_Input == "Stop"):
        if not x:
            print(f"Car already Stopped")
        else:
            x = False
            t.daemon = True
            print(f"Car Stopped, driving for {interval} Seconds")    
    else:
        print("I don't understand that command, use \"help\"for a list of commands")
    