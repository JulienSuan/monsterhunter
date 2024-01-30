using System;

namespace App
{
    class Program
    {
        static void Main(string[] args)
        {
            byte[] acaPointsByte = new byte[4];
            byte[] test = new byte[8];

            Console.WriteLine("acaPointsByte:");
            foreach (byte value in acaPointsByte)
            {
                Console.Write(value + " ");
            }
            Console.WriteLine(); // Saut de ligne

            Console.WriteLine("test:");
            foreach (byte value in test)
            {
                Console.Write(value + " ");
            }
            Console.WriteLine(); // Saut de ligne
        }
    }
}
