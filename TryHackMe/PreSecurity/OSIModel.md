### H2 OSI Model Introduction & Runthrough

### H3 Open Systems Interconnection (OSI) Model
- Fundamental model used in networking
- Dictates how networked devices send, recieve and interpret data
- Consists of seven layers
- Throughout each layer information is added to this data. The term for this is encapsulation

![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/OSI/OSI_Levels.svg)

### H4 Layer 7 - Application
![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/OSI/Level_7.svg)
- Determines how the user should interact with data
- Has a Graphical User Interface (GUI) for users to receive data
- Domain Name System (DNS) How website addresses are translated

### H4 Layer 6 - Presentation
![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/OSI/Level_6.svg)
- Standardisation for all software
- Translates data to the application layer
- Two different email clients will present the same email identically
- Security features such as data encryption (HTTPS) are at this level

### H4 Layer 5 - Session
![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/OSI/Level_5.svg)
- Begins to create a connection to destination
- Creates a new sessions when connection established
- Ensures both computers are on the same page before data is transmitted
- Divides data to packets
-- Benificial since any data that was sent wont have to be resent
- Sessions are unique
-- Data cannot travel between different sessions
-- Data can only travel individually between each session

### H4 Layer 4 - Transport
![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/OSI/Level_4.svg)
- Plays a vital part in transmitting data across a network
- Two protocols used:

-- Transmission Control Protocol (TCP)
--- Designed with reliability and guarentee in mind
--- Reserves a constant connection between two devices
--- Incorporates error checking
--- Used for file sharing, sending emails, internet browsing. Situations which require high accuracy and complete results (no half files)

![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/OSI/TCP.svg)

-- User Datagram Protocol (UDP)
--- Not as advanced as TCP
--- Does not have many features including error checking or reliability
--- There is no synchronization between the devices
--- This creates a much faster protocol
--- Unstable connections mean packets are not received
--- Used in live services such as gaming and streaming like spotify

![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/OSI/UDP.svg)

### H4 Layer 3 - Network
![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/OSI/Level_3.svg)

- Routing and re-assmebly of data takes place in this layer (small-to-larger chunk)
- Routing determines the most optimal path
- Some protocols determine the exact optimal path data should take
-- Open Shortest Path First (OSPF)
-- Routing Information Protocol (RIP)
- Factors which decide what route is taken is decided by the following
-- What path is the shortest?
-- What path is most reliable?
-- What path has the fastest connection?
- On this layer everything is dealt with via IP addresses. Routers capable of delivering packets via an IP address are known as a layer 3 device.

![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/OSI/Routing.svg)

### H4 Layer 2 - Data link
![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/OSI/Level_2.svg)

- Focus here is physical addressing
- L2 receives packet from L3 along with Dest IP then adds phyiscal MAC address of dest.
- Network Intervace Card (NIC) has a unique MAC address from factory
- Though MAC addresses can't be changed, they can be spoofed.
- When info is sent across the network it's the physical layer (L1) which determines where to send info.

### H4 Layer 1 - Physical
![Alt text](https://github.com/sobraxus/HomeLab/blob/master/TryHackMe/PreSecurity/OSI/Level_1.svg)

- References Physical Components
- Devices use 1's and 0's to transmit electric signals
- E.g. Ethernet cables connecting devices