// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.
// 屏幕地址为：0x4000 ~ 0x5FFF  十进制：16384 ~ 24575
// 键盘地址为: 0x6000  十进制：24576

    // R0存储屏幕的最高地址，R1存储当前遍历的屏幕地址
    @24575
    D=A
    @0
    M=D
    // R1初始化为屏幕的开始地址
    @SCREEN
    D=A
    @1
    M=D

(MAIN)
    // 如果键盘字段不为0则跳到FILL
    @KBD
    D=M
    @FILL
    D;JGT
    // 否则跳到CLEAR
    @CLEAR
    0;JMP

(FILL)
    // 若当前地址大于SCREEN的最高地址，说明屏幕已经全部变黑，不需要处理
    @1
    D=M
    @0
    D=D-M
    @MAIN
    D;JGT
    // 若当前地址比屏幕起始地址小，则需要先加1
    @1
    D=M
    @SCREEN
    D=D-M
    @INC
    D;JLT
    // 将当前地址对就的屏幕内容设置为全1，然后当前地址加1
    // -1表示一个字里面全是1
    @1
    A=M
    M=-1
    (INC)
    @1
    M=M+1
    // 跳回MAIN当中
    @MAIN
    0;JMP

(CLEAR)
    // 若当前地址小于屏幕起始地址，说明屏幕已全部清空，不需要处理
    @1
    D=M
    @SCREEN
    D=D-A
    @MAIN
    D;JLT
    // 若当前地址大于屏幕的最高地址，则需要先减1
    @1
    D=M
    @0
    D=D-M
    @DEC
    D;JGT
    // 将当前地址对就的屏幕内容设置为0，然后当前地址减1
    @1
    A=M
    M=0
    (DEC)
    @1
    M=M-1
    // 跳回MAIN当中
    @MAIN
    0;JMP