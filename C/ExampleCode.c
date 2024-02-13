#include <stdio.h>

int main(int argc, char const *argv[])
{
     /* printf("hello\n");
     int x, y, z;
     x = -6;
     y = 10;
     z = 19090;
     printf("x:%d\ny:%d\nz:%d\n", x, y, z);
     int intarray[4];
     intarray[0]=0;
     intarray[1]=1;
     intarray[2]=2;
     intarray[3]=3;

     printf("Second Number: %d\n", intarray[2]);

     char chararray[4];
     chararray[0]='T';
     chararray[1]='E';
     chararray[2]='S';
     chararray[3]='T';
     chararray[4]='\0'; // Null character

     printf("ALL CHARACTERS: %s\n", chararray); 

     unsigned char n=250;
     int i;

     for(i=0; i<10; i++){
          printf("%hhu | %hhX \n",n,n);
          n++;
     }
     printf("n is %hhu and n-10 equals %hhu\n",n,n-10);*/

     char i;

     for(i=0;i<128; i++){
          printf("%hhd | %hhX \n",i,i);
     }
}
