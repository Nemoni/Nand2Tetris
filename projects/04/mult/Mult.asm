// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)
//
// This program only needs to handle arguments that satisfy
// R0 >= 0, R1 >= 0, and R0*R1 < 32768.

// Put your code here.
// M*N相当于M个N相加

    // R2清空
    @2
    M=0
    // 若R0小于0则无法处理，直接结束
    @0
    D=M
    @END
    D;JLT
    // 若R1小于0则无法处理，直接结束
    @1
    D=M
    @END
    D;JLT

(LOOP)
    // R0从0处理到R1-1，所以可以先减1然后判断是否让总和加上R1的值
    @0
    M=M-1
    D=M
    @END
    D;JLT
    // R2加上R1的值
    @1
    D=M
    @2
    M=M+D
    @LOOP
    0;JMP

(END)
    @END
    0;JMP