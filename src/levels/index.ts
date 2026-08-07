import type { LevelInfo, TestCase } from '../engine/types';

export interface GameLevel {
    info: LevelInfo;
    tests: TestCase[];
}

export const LEVELS: GameLevel[] = [
    {
        "info": {
            "id": "lvl_01",
            "title": "Well, that's ODD",
            "description": "Create a machine that, given in input a sequence of numbers, increments by 1 every EVEN digit.\n\n(HINT: Remember that the number 0 is EVEN)",
            "hints": [
                "For example, if your input is this:\n_____16334087_____\nThen your output should be this:\n_____17335197_____"
            ],
            "allowedSymbols": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                " "
            ]
        },
        "tests": [
            {
                "input": "0123456789",
                "expected": "1133557799",
                "status": "pending"
            },
            {
                "input": "6188022718",
                "expected": "7199133719",
                "status": "pending"
            },
            {
                "input": "271828182",
                "expected": "371939193",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_02",
            "title": "[Counting inTENsifies]",
            "description": "Create a machine that, given a number, outputs the same number multiplied by TEN.\n\n(HINT: Underscores can be overwritten)",
            "hints": [
                "EXAMPLE:\n__123__->__1230_"
            ],
            "allowedSymbols": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                " "
            ]
        },
        "tests": [
            {
                "input": "3578",
                "expected": "35780",
                "status": "pending"
            },
            {
                "input": "100",
                "expected": "1000",
                "status": "pending"
            },
            {
                "input": "42",
                "expected": "420",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_03",
            "title": "There can be only ONE",
            "description": "Scan the input, and delete every 1 except the first.\n\n(HINT: To delete a character, overwrite it with an underscore)",
            "hints": [
                "EXAMPLE:\n__01213__->__012_3__"
            ],
            "allowedSymbols": [
                "0",
                "1",
                "2",
                "3",
                "4",
                " "
            ]
        },
        "tests": [
            {
                "input": "111",
                "expected": "1  ",
                "status": "pending"
            },
            {
                "input": "01234",
                "expected": "01234",
                "status": "pending"
            },
            {
                "input": "121131114",
                "expected": "12  3   4",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_04",
            "title": "NICEn't",
            "description": "The President is sick of all the immature jokes on the Internet, and decided to ban the number 69.\nYour task is to create a machine that scans the input, and replaces every occurrence of the forbidden number with its politically correct neighbour, the number 68.",
            "hints": [
                "EXAMPLES:\n__24699__->__24689__\n__69669__->__68668__"
            ],
            "allowedSymbols": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                " "
            ]
        },
        "tests": [
            {
                "input": "69",
                "expected": "68",
                "status": "pending"
            },
            {
                "input": "3691215",
                "expected": "3681215",
                "status": "pending"
            },
            {
                "input": "969669996",
                "expected": "968668996",
                "status": "pending"
            },
            {
                "input": "4569699",
                "expected": "4568689",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_05",
            "title": "Hide and seek",
            "description": "Delete all the x's that are not hiding inside of parentheses.",
            "hints": [
                "EXAMPLES:\n__x(xx)xx__->__(xx)__\n_(x)x(x)_->_(x)_(x)_"
            ],
            "allowedSymbols": [
                "x",
                "(",
                ")",
                " "
            ]
        },
        "tests": [
            {
                "input": "xx(xxx)xx",
                "expected": "  (xxx)  ",
                "status": "pending"
            },
            {
                "input": "()x",
                "expected": "() ",
                "status": "pending"
            },
            {
                "input": "(xx)xxx(x)()",
                "expected": "(xx)   (x)()",
                "status": "pending"
            },
            {
                "input": "xxx",
                "expected": "   ",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_06",
            "title": "Let's call it EVEN",
            "description": "In this level you will only need the numbers 0 and 1.\n\nCount the 1's in the input and determine if their total number is even or ODD.\nIf it's ODD, append another 1 at the end of the input, so that the total number of 1's becomes even.\nDo not overwrite the 0's.",
            "hints": [
                "EXAMPLE:\n__0100__->__01001_\n__0110__->__0110__"
            ],
            "allowedSymbols": [
                "0",
                "1",
                " "
            ]
        },
        "tests": [
            {
                "input": "000",
                "expected": "000",
                "status": "pending"
            },
            {
                "input": "100",
                "expected": "1001",
                "status": "pending"
            },
            {
                "input": "1011001",
                "expected": "1011001",
                "status": "pending"
            },
            {
                "input": "01110011",
                "expected": "011100111",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_07",
            "title": "The magic number",
            "description": "Write 1 if the input number is divisible by 3, or 0 otherwise.\n\nRemember to delete the original number, leave only the 0 or the 1.\n\n(HINT: A number is divisible by 3 if the sum of its digits is divisible by 3. If you're stuck, look at the previous level for inspiration.)",
            "hints": [
                "EXAMPLES:\n__123__->__1__\n__301__->__0__"
            ],
            "allowedSymbols": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                " "
            ]
        },
        "tests": [
            {
                "input": "2",
                "expected": "0",
                "status": "pending"
            },
            {
                "input": "9",
                "expected": "1",
                "status": "pending"
            },
            {
                "input": "11435754234",
                "expected": "1",
                "status": "pending"
            },
            {
                "input": "0",
                "expected": "1",
                "status": "pending"
            },
            {
                "input": "7689612857",
                "expected": "0",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_08",
            "title": "Survival of the largest",
            "description": "Scan the input, and output the largest digit you find.\n\nTo make things easier, the input will contain only digits 1 through 5.",
            "hints": [
                "EXAMPLES:\n__114223__->__4__\n__355252__->__5__"
            ],
            "allowedSymbols": [
                "1",
                "2",
                "3",
                "4",
                "5",
                " "
            ]
        },
        "tests": [
            {
                "input": "1",
                "expected": "1",
                "status": "pending"
            },
            {
                "input": "42",
                "expected": "4",
                "status": "pending"
            },
            {
                "input": "12345",
                "expected": "5",
                "status": "pending"
            },
            {
                "input": "1333221",
                "expected": "3",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_09",
            "title": "Last ONE standing",
            "description": "Delete every 1 except the last.\n\n(HINT: It's like level 3, but moving backwards)",
            "hints": [],
            "allowedSymbols": [
                "0",
                "1",
                " "
            ]
        },
        "tests": [
            {
                "input": "0111",
                "expected": "0  1",
                "status": "pending"
            },
            {
                "input": "10101010",
                "expected": " 0 0 010",
                "status": "pending"
            },
            {
                "input": "00000",
                "expected": "00000",
                "status": "pending"
            },
            {
                "input": "1000001",
                "expected": " 000001",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_10",
            "title": "The other magic number",
            "description": "Write 1 if the input number is divisible by 100, or 0 otherwise.\n\nRemember to delete the original number, leave only the 0 or the 1.",
            "hints": [
                "EXAMPLES:\n__123__->__0__\n__4200__->__1__"
            ],
            "allowedSymbols": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                " "
            ]
        },
        "tests": [
            {
                "input": "100",
                "expected": "1",
                "status": "pending"
            },
            {
                "input": "0",
                "expected": "1",
                "status": "pending"
            },
            {
                "input": "545385279",
                "expected": "0",
                "status": "pending"
            },
            {
                "input": "8724175865200",
                "expected": "1",
                "status": "pending"
            },
            {
                "input": "1000001",
                "expected": "0",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_11",
            "title": "+1!",
            "description": "Increment the input number by 1.",
            "hints": [
                "EXAMPLE:\n__23__->__24__\n__39__->__40__"
            ],
            "allowedSymbols": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                " "
            ]
        },
        "tests": [
            {
                "input": "123",
                "expected": "124",
                "status": "pending"
            },
            {
                "input": "59",
                "expected": "60",
                "status": "pending"
            },
            {
                "input": "60",
                "expected": "61",
                "status": "pending"
            },
            {
                "input": "299",
                "expected": "300",
                "status": "pending"
            },
            {
                "input": "999",
                "expected": "1000",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_12",
            "title": "The league of the N evil exes",
            "description": "You will receive in input a number N (one digit, between 0 and 9).\n\nWrite in output the letter X exactly N times, and delete the initial number.",
            "hints": [
                "EXAMPLE:\n__5__->__XXXXX__"
            ],
            "allowedSymbols": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "X",
                " "
            ]
        },
        "tests": [
            {
                "input": "1",
                "expected": "X",
                "status": "pending"
            },
            {
                "input": "4",
                "expected": "XXXX",
                "status": "pending"
            },
            {
                "input": "0",
                "expected": "",
                "status": "pending"
            },
            {
                "input": "7",
                "expected": "XXXXXXX",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_13",
            "title": "Clash of numbers",
            "description": "The input will contain two digits. Write the difference between the two digits (without sign).\n\n(HINT: There are two methods to solve this problem: you can calculate the difference directly, or you can decrement both digits one by one until one of them reaches 0. I recommend the second approach.)",
            "hints": [
                "EXAMPLES:\n__53__->__2__\n__18__->__7__"
            ],
            "allowedSymbols": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                " "
            ]
        },
        "tests": [
            {
                "input": "42",
                "expected": "2",
                "status": "pending"
            },
            {
                "input": "07",
                "expected": "7",
                "status": "pending"
            },
            {
                "input": "33",
                "expected": "0",
                "status": "pending"
            },
            {
                "input": "00",
                "expected": "0",
                "status": "pending"
            },
            {
                "input": "69",
                "expected": "3",
                "status": "pending"
            },
            {
                "input": "20",
                "expected": "2",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_14",
            "title": "It all adds up",
            "description": "The input will contain two numbers separated by an underscore. Your output should contain the sum of the two numbers.",
            "hints": [
                "EXAMPLES:\n__15_9__->__24__\n__41_182__->__223__"
            ],
            "allowedSymbols": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "_",
                " "
            ]
        },
        "tests": [
            {
                "input": "39_3",
                "expected": "42",
                "status": "pending"
            },
            {
                "input": "400_20",
                "expected": "420",
                "status": "pending"
            },
            {
                "input": "0_0",
                "expected": "0",
                "status": "pending"
            },
            {
                "input": "0_13",
                "expected": "13",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_15",
            "title": "Make it COUNT",
            "description": "Write (in numbers) how many times the letter X is repeated in the input tape.\n\nRemember to delete the X's as you count them: the final output must contain only the number.\n\n(HINT: While running a test, increase the speed using the + button)",
            "hints": [
                "EXAMPLE:\n__XXX__->__3__"
            ],
            "allowedSymbols": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "X",
                " "
            ]
        },
        "tests": [
            {
                "input": "XXXXX",
                "expected": "5",
                "status": "pending"
            },
            {
                "input": "XXXXXXXXXXXXX",
                "expected": "13",
                "status": "pending"
            },
            {
                "input": "",
                "expected": "0",
                "status": "pending"
            },
            {
                "input": "X",
                "expected": "1",
                "status": "pending"
            },
            {
                "input": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "expected": "111",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_16",
            "title": "Repetita iuvant",
            "description": "You will receive in input a number N (just like two levels ago, but this time N will be greater than 10).\n\nWrite in output the letter X exactly N times, and delete the initial number.",
            "hints": [],
            "allowedSymbols": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "X",
                " "
            ]
        },
        "tests": [
            {
                "input": "11",
                "expected": "XXXXXXXXXXX",
                "status": "pending"
            },
            {
                "input": "42",
                "expected": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "status": "pending"
            },
            {
                "input": "100",
                "expected": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_17",
            "title": "Double trouble",
            "description": "You just hacked in your bank account! Use a Turing Machine to double your amount of $.",
            "hints": [
                "EXAMPLE:\n__$$$__->__$$$$$$__"
            ],
            "allowedSymbols": [
                "$",
                " "
            ]
        },
        "tests": [
            {
                "input": "$$$$",
                "expected": "$$$$$$$$",
                "status": "pending"
            },
            {
                "input": "",
                "expected": "",
                "status": "pending"
            },
            {
                "input": "$$$$$$$$$$$$$$$",
                "expected": "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_18",
            "title": "Sp_lit",
            "description": "The input will contain a sequence of 1s and 0s. Whenever you find a group of two or more 1s close together, separate them by inserting a 0 between them.\n\nNote: when inserting the 0, do not replace the 1, but shift it (and all the following digits) to the right.",
            "hints": [
                "EXAMPLES:\n__110__->__1010__\n__111__->__10101__"
            ],
            "allowedSymbols": [
                "0",
                "1",
                " "
            ]
        },
        "tests": [
            {
                "input": "00110001001110",
                "expected": "00101000100101010",
                "status": "pending"
            },
            {
                "input": "0001000",
                "expected": "0001000",
                "status": "pending"
            },
            {
                "input": "1",
                "expected": "1",
                "status": "pending"
            },
            {
                "input": "1110111",
                "expected": "10101010101",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_19",
            "title": "Sort it out",
            "description": "Oh no! An earthquake messed up your collection of number-shaped fridge magnets, and now they're all scrambled on the floor in random order.\n\nCan you put them back in their place? First the 1's on the left, then the 2's in the middle, and finally the 3's on the right.\n\nMake sure you don't add or remove any magnet to your collection, they're all numbered! (hehe)\n\n(HINT: If you're stuck, look up \"bubble sort\" on your preferred search engine)",
            "hints": [
                "EXAMPLE:\n__121313123__->__111122333__"
            ],
            "allowedSymbols": [
                "1",
                "2",
                "3",
                " "
            ]
        },
        "tests": [
            {
                "input": "321",
                "expected": "123",
                "status": "pending"
            },
            {
                "input": "23133123231321",
                "expected": "11112222333333",
                "status": "pending"
            },
            {
                "input": "123",
                "expected": "123",
                "status": "pending"
            },
            {
                "input": "133131131",
                "expected": "111113333",
                "status": "pending"
            },
            {
                "input": "2222",
                "expected": "2222",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_20",
            "title": "Is this Lisp?",
            "description": "The input will contain a sequence of ( and ). Write ( if the parentheses are properly matched, ) otherwise.\n\nFor your convenience, in this level you can also use [ and ] as \"helper\" symbols.",
            "hints": [
                "EXAMPLES:\n__())__->__)__\n__(())__->__(__\n__()()__->__(__\n__)()__->__)__"
            ],
            "allowedSymbols": [
                "(",
                ")",
                "[",
                "]",
                " "
            ]
        },
        "tests": [
            {
                "input": "()",
                "expected": "(",
                "status": "pending"
            },
            {
                "input": "()()(())",
                "expected": "(",
                "status": "pending"
            },
            {
                "input": "()(()))((()(()))",
                "expected": ")",
                "status": "pending"
            },
            {
                "input": "(",
                "expected": ")",
                "status": "pending"
            },
            {
                "input": "((()()(())))",
                "expected": "(",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_21",
            "title": "Among us",
            "description": "Captain! The Impostors have infiltrated our spaceship, we must find them before they can sabotage the crewmembers.\n\nThe numbers 0 and 1 represent crewmembers, while the impostors are represented by the number 2.\n\nEliminate the impostors, without changing the number and the order of crewmates, and without leaving gaps between them.",
            "hints": [
                "EXAMPLE:\n__01200__->__0100__\n(NOT __01_00__)"
            ],
            "allowedSymbols": [
                "0",
                "1",
                "2",
                " "
            ]
        },
        "tests": [
            {
                "input": "110121110",
                "expected": "11011110",
                "status": "pending"
            },
            {
                "input": "21001",
                "expected": "1001",
                "status": "pending"
            },
            {
                "input": "01112",
                "expected": "0111",
                "status": "pending"
            },
            {
                "input": "222",
                "expected": "",
                "status": "pending"
            },
            {
                "input": "11200121021120201121111121112002",
                "expected": "11001101100111111111100",
                "status": "pending"
            },
            {
                "input": "221000222210101112201112222110120101",
                "expected": "10001010111011111010101",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_22",
            "title": "It's a match!",
            "description": "The input will contain two sequences of 1s and 0s, separated by an underscore. Write 1 if they are equal, or 0 if they aren't.",
            "hints": [
                "EXAMPLES:\n__10_10__->__1__\n__10_01__->__0__\n__101_1__->__0__"
            ],
            "allowedSymbols": [
                "0",
                "1",
                "_",
                " "
            ]
        },
        "tests": [
            {
                "input": "1_0",
                "expected": "0",
                "status": "pending"
            },
            {
                "input": "100100101_10010010",
                "expected": "0",
                "status": "pending"
            },
            {
                "input": "000101010_000101010",
                "expected": "1",
                "status": "pending"
            },
            {
                "input": "0010101111_00101011110",
                "expected": "0",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_23",
            "title": "Apples to oranges",
            "description": "You are a contestant in a game show on TV. The host shows you two boxes: the one on the left is full of apples, the one on the right contains oranges. Can you guess which box contains more fruits?\n\nOverwrite the underscore between the two boxes with the symbol > if there are more apples, < if there are more oranges, or = if they are equal.",
            "hints": [
                "Your input will look like this:\n__[AA]_[OOO]__\nEach pair of brackets represents a box, each A represents an apple, and each O represents an orange.",
                "Do not overwrite the letters or the brackets. The output should look like this:\n__[AA]<[OOO]__"
            ],
            "allowedSymbols": [
                "[",
                "]",
                "A",
                "O",
                "_",
                "<",
                ">",
                "=",
                " "
            ]
        },
        "tests": [
            {
                "input": "[AAAA]_[OO]",
                "expected": "[AAAA]>[OO]",
                "status": "pending"
            },
            {
                "input": "[AAAAAAAA]_[OOOOOOOOOOOOOO]",
                "expected": "[AAAAAAAA]<[OOOOOOOOOOOOOO]",
                "status": "pending"
            },
            {
                "input": "[AAA]_[OOO]",
                "expected": "[AAA]=[OOO]",
                "status": "pending"
            },
            {
                "input": "[AAAA]_[]",
                "expected": "[AAAA]>[]",
                "status": "pending"
            },
            {
                "input": "[]_[]",
                "expected": "[]=[]",
                "status": "pending"
            },
            {
                "input": "[]_[OOO]",
                "expected": "[]<[OOO]",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_24",
            "title": "esreveR",
            "description": "The input will contain a sequence of digits. Write to output its reverse.\n\nTo make things easier, the input will contain only digits 1 through 5.",
            "hints": [
                "EXAMPLES:\n__42__->__24__\n__311__->__113__"
            ],
            "allowedSymbols": [
                "1",
                "2",
                "3",
                "4",
                "5",
                " "
            ]
        },
        "tests": [
            {
                "input": "123",
                "expected": "321",
                "status": "pending"
            },
            {
                "input": "4",
                "expected": "4",
                "status": "pending"
            },
            {
                "input": "5555",
                "expected": "5555",
                "status": "pending"
            },
            {
                "input": "21532152131123",
                "expected": "32113125123512",
                "status": "pending"
            }
        ]
    },
    {
        "info": {
            "id": "lvl_25",
            "title": "Majority vote",
            "description": "You just received a call from the President's office. He was very satisfied with the work you did for him in level 4, and he decided to give you another job: write the software that will count the votes in the upcoming election.\n\nYou will receive in input a list of 0's and 1's. Each 0 represents a vote for the re-election of the current president, and each 1 represents a vote for the other candidate.\nYou must count the votes, and declare the winner: write in the output a single 1 or 0, depending on who obtained the majority. In the case of a tie, the rules say that the current president gets re-elected anyway, so write a 0.",
            "hints": [
                "EXAMPLE:\n__1100011101__->__1__"
            ],
            "allowedSymbols": [
                "0",
                "1",
                " "
            ]
        },
        "tests": [
            {
                "input": "11010011",
                "expected": "1",
                "status": "pending"
            },
            {
                "input": "0001000000000011101001101",
                "expected": "0",
                "status": "pending"
            },
            {
                "input": "01110001",
                "expected": "0",
                "status": "pending"
            },
            {
                "input": "0",
                "expected": "0",
                "status": "pending"
            },
            {
                "input": "1111",
                "expected": "1",
                "status": "pending"
            },
            {
                "input": "00011111",
                "expected": "1",
                "status": "pending"
            }
        ]
    }
];
