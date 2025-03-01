import React, {useEffect, useRef, useState} from "react";
import {bcnf, nf2, nf3} from "../../Resources/Images/Others";
import axios from "axios";
import {username} from "./constants";
import {IoIosStar} from "react-icons/io";

export const AppText = {
    IntroText1: 'Hello Detective, I am Detective Query Quinn, your Personal Assistant.',
    IntroText2: 'Greetings Detective, I am The Chief of Detectives, Sgt. Schema.',
    WelcomeText: 'In this journey, you will be learning RDBMS from scratch through solving case.',
    SecondText: 'to know case details, we will clear our basics first.  ',
    RelationName: 'This is called, the Relation Name. Its the name of the Table (which is known as Relation in RDBMS).',
    Relation: 'This is the Table, or in DBMS, known as Relation. Each row is called Tuple.',
    Attributes: 'These are the headings of each columns, known as the Attributes',
    GivenFD: '{Person ID, Location} -> {Action}, {Person ID} -> {Room Type, Room Contents}, {Location} -> {Camera ID}, {Camera ID} -> {Camera Status, Camera Footage}, {Room Type} -> {Time, Witness Statement}',
    FDs: 'These are functional dependencies, or FD Set',
    WhatFDs: 'A functional dependency is a relationship between two sets of attributes in a database. It describes how the value of one attribute determines the value of another attribute.',
    ExampleRelation: 'R(ABCDE) {Where ABCD are attributes in Relation R}',
    ExampleFDs: '[AB->C, B->D, D->A]',
    ABFDc: '[AB]+ = [ABCD]',
    BFDc: '[B]+ = [BDAC]',
    DFDc: '[D]+ = [DA]',
    CFDc: '[C]+ = [C]',
    AFDc: '[A]+ = [A]',
    HowToFD: 'We will now learn to take FD Closure, of those attributes, which are determinant (LHS of FD) in FD set. Here, A B, B and D.',
    WhatFDClosures: 'Functional dependency closures are used to understand how different attributes (or columns) in a database are related to each other based on functional dependencies.',
    WhyFDClosures: 'Functional dependency closures are taken to identify all derived attributes, ensure database normalization, and determine candidate keys for better data integrity and design.',
    ABFDcExplanation: 'The Closure of A B will first contain A B itself. Then from the given FD Set, check if A or B or A B give (->) any attribute. As we can see, A B gives C, and B gives D. Hence CD will be added. If all attributes are covered, or if in the closure any attribute (self or combination of attributes) doesn\'t give out any attribute, we stop there.',
    AFDcExplanation: 'A\'s  FD Closure will be A only, as A doesn\'t give out any other attribute by itself.',
    CFdcExplanation: 'Similarly for C, as it doesn\'t give out any other attribute, hence it\'s FD Closure will have only C.',
    BFDcExplanation: 'The Closure of B will first contain itself, then by referring FD Set, we see, B gives D, so D is added. Now in the Closure, D is also there, which is giving out A, so A will be added. We can stop here.',
    DFDcExplanation: 'The Closure of D will first contain D itself, then by referring FD Set, we see, D gives A, so A is added. We can stop here.',
    HelpingFD: 'Hello, I am Agent Joins, your Junior Assistant. If you get stuck, just click the "Hint Lens" beside the Level for a clue.',
    NiceWorkFD: 'Good Job Detective! Let\'s Dive more into DBMS now.',
    EasyFDA: 'A is giving B, which in return gives D indirectly.',
    EasyFDB: 'B is only giving one attribute.',
    EasyFDC: 'C is not in left, by itself.',
    EasyFDD: 'D is not in left, by itself.',
    EasyFDAC: 'It might be giving all, check if?',
    DiffFDA: 'Single A is giving something.',
    DiffFDB: 'B is only giving one attribute.',
    DiffFDC: 'C is only giving one attribute.',
    DiffFDD: 'D is only giving one attribute.',
    DiffFDE: 'E is only giving one attribute.',
    DiffFDF: 'F is only giving one attribute.',
    DiffFDG: 'G is giving something, alone.',
    DiffFDH: 'H is only giving one attribute.',
    DiffFDAC: 'A and C, together are giving one attribute.',
    DiffFDAF: 'It might be giving all, check if?',
    WhatAreKeys: 'In DBMS, keys are attributes or sets of attributes that uniquely identify tuples (rows) in a relation (table).',
    SomeSpecialKeys: 'There are some special Keys in DBMS, let\'s go through some.',
    SuperKeys: 'You must have noticed, that there are some attributes, or group of attributes that together give out the whole Relation, in FD Closure. Such attributes or group of attributes are known as Super Keys of the Relation.',
    ReadOutSuperKeys: 'Read out the two examples of Super Keys given here.',
    CandidateKeys: 'Let\'s see what Candidate Keys are. Candidate Keys are special keys that are derived from Super Keys itself.',
    CandidateKeysDef: 'A candidate key is a minimal SuperKey, meaning it uniquely identifies all tuples in a relation, but no proper subset of it can still be a SuperKey.',
    CandidateKeyEasy1: 'Every Candidate Key is Super Key, but not vice versa. We will take FD Closure of all possible Proper Subsets of Super Key to get minimal group, to be declared as Candidate Key.',
    CandidateKeyEasy2: 'Confused? Let\'s understand it from this example.',
    PrimaryKeyDef: 'There is one Special Key, named, Primary Key. It\'s one of the keys arbitrarily chosen from the set of Candidate Keys available for Table, and hence, a Relation can have multiple Candidate Keys, but only one Primary Key.',
    DirectWay: 'We saw how we can get Candidate Keys, but that is quite lengthy. Instead we can directly derive multiple Candidate Keys.',
    GoldenMantra: 'Before we dive into the direct method, remember a "Golden Mantra", "Won\'t say Candidate Key, until there is Minimal of minimal; Go as Minimal As you Can."',
    CandidateKeyUnderstand: 'Let\'s understand this through the following examples.',
    PrimeKeyAttributes: 'Before diving into the examples, it\'s important to know what Prime/Key Attributes and Non Key Attributes are. Prime/Key Attributes, are the attributes that came up in the Candidate Keys. For Example, if the Candidate Keys are {A B, C, DF}, then the Prime/Key Attributes are {A, B, C, D, F} and rest attributes in the Relation, are the Non Key Attributes.',
    PracticeKeys: 'Detective, let\'s practice some questions on Candidate Keys now.',
    KeysHelp: 'Welcome Back, Detective. You know the drill, if you get stuck, just click the "Hint Lens" beside the Level for a clue.',
    CorrectAnsKeys: 'Good Job Detective! Let\'s dive finally into what is called, Normalisation.',
    WrongAnsKeys: 'Be Careful Detective! There are some mistakes!!',
    FinaleModule1: 'And here we are, finally at the end of Module 1, Detective. Here we will finally discuss, Normalisation, that will combine all our knowledge we have gained till this end.',
    WhatisNormalisation: 'Normalization is the process of organizing a database to reduce redundancy and improve data integrity by dividing larger tables into smaller, related tables based on functional dependencies.',
    WhyNormalisation: 'Normalization is done to eliminate data redundancy, ensure data consistency, minimize anomalies (insertion, update, and deletion anomalies), and improve database efficiency.',
    NormalForm1: 'As Chief said, Normalisation breaks down big relation, into small relations. So they end up in Some kind of forms, depending what kind of normalisation has been done.',
    NormalForm2: 'Like, have the Partial Dependency been removed? Or both Partial and Transitive Dependency been removed?',
    NormalForm3: 'Such Forms are known as, Normal Forms, which are categorised as Normal Form 1 (1NF), or Normal Form 2 (2NF), or Normal Form 3 (3NF), or Boyce-Codd Normal Form (BCNF).',
    Discuss: 'Don\'t worry, we will discuss each in a very easy and effective way.',
    MoveToDecomposition: 'We are done with the Identification, now let\'s see how to decompose given relations into 1NF, 2NF, 3NF, and BCNF.',
    FinalTest: 'Detective, let\'s head towards Decomposing our case relation now.',
    IntrotoTest: 'Hello Detective, congratulations on finally coming to end of Module 1 Tutorial Game. Here we will be decomposing our Game\'s tables, from the given relation.',
    EveryGameDecompose: 'From next games, you will be given to decompose the tables, from relation in Module 1.',
    LetsDecompose: 'Let\'s Decompose the relation now.',
    Hmm: '',
    CorrectAnsKNF: 'Good Job Detective! Let\'s move forward with Module 2.',
    Intro1Module2: 'Welcome to the Module 2, Detective.',
    Intro2Module2: 'We would go through, step by step, what Structured Query Language (SQL) is, and how we will be using it, to fetch our information from the tables, you normalised earlier, and then, solve the case.',
    StepbyStep: 'Step by step, we will learn to create Query statements.',
    StructureStatement: 'The structure of the statement is like; {Action}, {Action On}, {Source Location}, {Condition (if)}.',
    ExampleSQL: 'Let\'s understand this using examples, listed here.',
    ImportantToRemember: 'One thing we need to know that, in sql statements, except the keywords, all other values are case sensitive. The keywords aren\'t case sensitive, but they are written either in lower cases, or upper cases. Example, SELECT or select, FROM or from. But make sure if started with lower case, complete the whole statement with lower case, and vice versa.',
    SQLImportantCommands: 'SELECT, UPDATE, INSERT INTO, DELETE, CREATE, ALTER, DROP',
    SQLImportantCommandsExplanation: 'The SELECT Statement, is used to select the attributes that the user needs to view details of, from the table. The UPDATE command, updates the value of particular attribute with the value you need. Insert Into is used to insert a record, or a tuple in the table. Delete command is used to delete a row, depending upon the condition. Create commands creates tables, databases, as per user needs. Alter table is used to update the name of attribute in the table. And Drop commands are used to erase a table off the database, or even database, out of existence.',
    timeBeing: 'Hey hello how are you why are you here who are you with when is your bday.',
    SelectSQL: 'Here we see an example on, SELECT statement for SQL. The example taken here is on a Relation, named, Example_Table. The action is, SELECT; action is done on Attribute 1, and Attribute 2; and the source location is the relation name. This statement means that, it\'s selecting the given attributes out of all attribute from the table, to view the whole contents of the given attributes. If we need to have all records, we can fetch it directly using SELECT * OR select *, instead of listing all the attributes.',
    WhereSQL: 'Here we see and example on, WHERE clause for SQL. This clause is used to filter out records, and acts as condition statement. In the example, we see, user needs to get the records, that have the attribute Age\'s value less than 25. Hence it resulted in providing two tuples.',
    OrderBySQL: 'Here we see and example on, ORDER BY clause for SQL. This clause is used to list records in ascending or descending value with respect to an attribute of the table. In the example, we see, user ordered the attribute Age\'s value. Hence the tuples are arranged in ascending by default. For descending, user can simply write, in upper cases, ORDER BY {Attribute_name} DESC or in lower cases, order by {Attribute_name} desc.',
    AndSQL: 'Here we see and example on, AND statement for SQL. This clause is used to list a particular set of records, that is filtered based on more than one condition. In the example, the user needs the tuple that has Age\'s value 23 AND (including) 29.',
    OrSQL: 'Here we see and example on, OR statement for SQL. This clause is used to list a particular set of records, that is filtered based on more than one condition, but if any one condition is also satisfied, the work is done. In the example, the user needs the tuple that has Age\'s value 23 OR the value of attribute Name is Bharti. It\'s not necessary for the other attributes to have the value what user needs to give the result, it can return with one single true or existing record.',
    Condition: 'We can apply condition to filter out some records, depending upon what we need. It\'s done by WHERE clause.',
    WhatisSQLAggr: 'An aggregate function is a function that performs a calculation on a set of values, and returns a single value.',
    DistinctSQL: 'Here we see and example on, DISTINCT Clause for SQL. This clause is used to list a particular set of records, that is filtered based on unique occurrence of a particular value in an attribute. In the example, the user needs distinct ages in the table, and in returns finds, that there are two distinct Age values, 22 and 23.',
    NotSQL: 'Here we see and example on, NOT Clause for SQL. This clause is used in combination with other operators to give the opposite result. In the example, the user the records where the value for the attribute Age, is not between the range of 20 to 25.',
    GroupBySQL: 'Here we see and example on, Group By Clause for SQL. This clause is used in when we need to view records, in a way, to group the records, accordingly with an attribute. In this example, we see, by grouping the attribute Age, the records with same Age value got grouped up, and we get to see, the total numbers of each of those values are there in the records.',
    HavingSQL: 'Here we see and example on, Having Clause for SQL. The Where keyword can\'t be used with aggregate functions, which will be discussed next. Generally used along Group By, this provide users to view records, with such aggregate operations on grouped attributes. In this example, the records are grouped along the Age values in the records. And then the operation provides the count of ID, of group of Age values, that has ID value more than 101.',
    WhatisAggregateFunctions: 'Now, let\'s see, what is meant by Aggregate Functions.',
    AggregateFunctionsDef: 'An aggregate function is a function that performs a calculation on a set of values, and returns a single value.',
    MaxMinSQL: 'Here we see and example on, Max() and Min() aggregate functions for SQL. These are two different functions, where, the Max() provide the record that has a maximum value for a particular attribute, and Min() provide the record with minimum value for the particular attribute.',
    CountSQL: 'Here we see and example on, Count() aggregate function for SQL. This function, provide the total existence of a particular value for the attribute, and with distinct, can be used to get the total existing distinct values in that attribute specified in the parenthesis. Note one thing that, Count() DOESN\'T IGNORE NULL VALUES, LIKE OTHER AGGREGATE FUNCTIONS.',
    SumSQL: 'Here we see and example on, Sum() aggregate function for SQL. This function, provide the total sum of all values for the attribute, specified in the parenthesis.',
    AvgSQL: 'Here we see and example on, Avg() aggregate function for SQL. This function, provide the average of overall values for the attribute, specified in the parenthesis.',
    PracticeQuery1: 'Detective, let\'s practice these SQL Queries, the operations and functions, on a predefined database.',
    SQL1Help1: 'Let\'s utilise the knowledge gained in the last section, related to Query Language. Practice simple Query statements for each clause and operations we discussed earlier.',
    SQL1Help2: 'Don\'t worry about, if you remember all of them at once, the module will provide you with a tracker, having all of them, and will make sure you practised at least one query statement for each, on the dummy database given here.',
}

export const DetailsofCases = [
    {
        id: 1,
        type: 'Basics, Normalisation And Query Language',
        module1: 'Basics and Normalisation',
        module1Detail: 'This module covers basic introduction to Relational Database Management System, then it goes through the concept of Functional Dependency and Functional Dependency Closure. This module then covers basic and brief information on all kinds of Keys, and how to derive such Keys. This module finally ends with introducing Normalisation, what are the Normal Forms, how to detect, and how to decompose.',
        module2: 'Query Language',
        module2Detail: 'This module covers an introduction to Structured Query Language, how to write SQL commands, using all the necessary commands like Aggregate commands, Group By and Having Clause, Nested (Independent and Dependent) Queries, Where clause and other such commands.'
    },
    {
        id: 1,
        type: 'File Organisation, and Indexing',
    },
    {
        id: 1,
        type: 'Relational Algebra',
    }
]

export const FirstTables = () => {
    return (
        <div className={'items-center text-center justify-center mx-auto'}>
            <table
                className="table-auto mx-10 my-3 items-center text-center justify-center border-collapse rounded-3xl border-2 border-black">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border border-black px-4 py-2 text-left">Person ID</th>
                    <th className="border border-black px-4 py-2 text-left">Location</th>
                    <th className="border border-black px-4 py-2 text-left">Action</th>
                    <th className="border border-black px-4 py-2 text-left">Room Type</th>
                    <th className="border border-black px-4 py-2 text-left">Room Contents</th>
                    <th className="border border-black px-4 py-2 text-left">Camera ID</th>
                    <th className="border border-black px-4 py-2 text-left">Camera Status</th>
                    <th className="border border-black px-4 py-2 text-left">Camera Footage</th>
                    <th className="border border-black px-4 py-2 text-left">Time</th>
                    <th className="border border-black px-4 py-2 text-left">Witness Statement</th>
                </tr>
                </thead>
                <tbody className={'border-black'}>
                <tr>
                    <td className="border border-black px-4 py-2">1</td>
                    <td className="border border-black px-4 py-2">Drawing Room</td>
                    <td className="border border-black px-4 py-2">Sitting</td>
                    <td className="border border-black px-4 py-2">Drawing Room</td>
                    <td className="border border-black px-4 py-2">Sofa, Table, Lamp</td>
                    <td className="border border-black px-4 py-2">101</td>
                    <td className="border border-black px-4 py-2">Working</td>
                    <td className="border border-black px-4 py-2">Footage Available</td>
                    <td className="border border-black px-4 py-2">8:00 PM</td>
                    <td className="border border-black px-4 py-2">Saw Person A sitting in the Drawing Room at the
                        time.
                    </td>
                </tr>
                <tr>
                    <td className="border border-black px-4 py-2">2</td>
                    <td className="border border-black px-4 py-2">Hall</td>
                    <td className="border border-black px-4 py-2">Standing</td>
                    <td className="border border-black px-4 py-2">Hall</td>
                    <td className="border border-black px-4 py-2">Table, Chairs</td>
                    <td className="border border-black px-4 py-2">102</td>
                    <td className="border border-black px-4 py-2">Malfunctioning</td>
                    <td className="border border-black px-4 py-2">Footage Not Available</td>
                    <td className="border border-black px-4 py-2">8:05 PM</td>
                    <td className="border border-black px-4 py-2">Witnessed Person B standing in the Hall at the time.
                    </td>
                </tr>
                <tr>
                    <td className="border border-black px-4 py-2">3</td>
                    <td className="border border-black px-4 py-2">Kitchen</td>
                    <td className="border border-black px-4 py-2">Cooking</td>
                    <td className="border border-black px-4 py-2">Kitchen</td>
                    <td className="border border-black px-4 py-2">Refrigerator, Stove</td>
                    <td className="border border-black px-4 py-2">103</td>
                    <td className="border border-black px-4 py-2">Working</td>
                    <td className="border border-black px-4 py-2">Footage Available</td>
                    <td className="border border-black px-4 py-2">8:10 PM</td>
                    <td className="border border-black px-4 py-2">Heard noises in the kitchen but couldn't see anyone.
                    </td>
                </tr>
                <tr>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export const FirstTables1 = () => {
    return (
        <div className={'items-center text-center justify-center mx-auto'}>
            <table
                className="table-auto items-center text-center justify-center border-collapse rounded-3xl border-2 border-black">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border border-black px-4 py-2 text-left">Person ID</th>
                    <th className="border border-black px-4 py-2 text-left">Location</th>
                    <th className="border border-black px-4 py-2 text-left">Action</th>
                    <th className="border border-black px-4 py-2 text-left">Room Type</th>
                    <th className="border border-black px-4 py-2 text-left">Room Contents</th>
                    <th className="border border-black px-4 py-2 text-left">Camera ID</th>
                    <th className="border border-black px-4 py-2 text-left">Camera Status</th>
                    <th className="border border-black px-4 py-2 text-left">Camera Footage</th>
                    <th className="border border-black px-4 py-2 text-left">Time</th>
                    <th className="border border-black px-4 py-2 text-left">Witness Statement</th>
                </tr>
                </thead>
                <tbody className={'border-black bg-[#a2e1e1]'}>
                <tr>
                    <td className="border border-black px-4 py-2">1</td>
                    <td className="border border-black px-4 py-2">Drawing Room</td>
                    <td className="border border-black px-4 py-2">Sitting</td>
                    <td className="border border-black px-4 py-2">Drawing Room</td>
                    <td className="border border-black px-4 py-2">Sofa, Table, Lamp</td>
                    <td className="border border-black px-4 py-2">101</td>
                    <td className="border border-black px-4 py-2">Working</td>
                    <td className="border border-black px-4 py-2">Footage Available</td>
                    <td className="border border-black px-4 py-2">8:00 PM</td>
                    <td className="border border-black px-4 py-2">Saw Person A sitting in the Drawing Room at the
                        time.
                    </td>
                </tr>
                <tr>
                    <td className="border border-black px-4 py-2">2</td>
                    <td className="border border-black px-4 py-2">Hall</td>
                    <td className="border border-black px-4 py-2">Standing</td>
                    <td className="border border-black px-4 py-2">Hall</td>
                    <td className="border border-black px-4 py-2">Table, Chairs</td>
                    <td className="border border-black px-4 py-2">102</td>
                    <td className="border border-black px-4 py-2">Malfunctioning</td>
                    <td className="border border-black px-4 py-2">Footage Not Available</td>
                    <td className="border border-black px-4 py-2">8:05 PM</td>
                    <td className="border border-black px-4 py-2">Witnessed Person B standing in the Hall at the time.
                    </td>
                </tr>
                <tr>
                    <td className="border border-black px-4 py-2">3</td>
                    <td className="border border-black px-4 py-2">Kitchen</td>
                    <td className="border border-black px-4 py-2">Cooking</td>
                    <td className="border border-black px-4 py-2">Kitchen</td>
                    <td className="border border-black px-4 py-2">Refrigerator, Stove</td>
                    <td className="border border-black px-4 py-2">103</td>
                    <td className="border border-black px-4 py-2">Working</td>
                    <td className="border border-black px-4 py-2">Footage Available</td>
                    <td className="border border-black px-4 py-2">8:10 PM</td>
                    <td className="border border-black px-4 py-2">Heard noises in the kitchen but couldn't see anyone.
                    </td>
                </tr>
                <tr>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                    <td className="border border-black px-4 py-2">...</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
export const practiceFDClosure = [
    {
        id: 1,
        relations: 'R(ABCDE)',
        level: 'Easy',
        fdset: '[A->B, B->D, AC->E]',
        fdA: 'ABD',
        fdB: 'BD',
        fdC: 'C',
        fdD: 'D',
        fdAC: 'ABCDE'
    },
    {
        id: 2,
        relations: 'R(ABCDEFGH)',
        level: 'Difficult',
        fdset: '[A->BH, G->D, AC->E, AF->GC]',
        fdA: 'ABH',
        fdB: 'B',
        fdC: 'C',
        fdD: 'D',
        fdE: 'E',
        fdF: 'F',
        fdG: 'GD',
        fdH: 'H',
        fdAC: 'ABCEH',
        fdAF: 'ABCDEFGH'
    },
]


export const SuperKeysExample1Json = [
    {
        relation: 'R(ABCDEF)',
        fdSet: '[A->C, B->D, CD->E, AF->B]',
        superKey1: 'AF',
        superKey2: 'ADF',
        superKey3: 'ABF',
        superKey4: 'ACF',
        superKey5: 'ABCF',
        superKey6: 'ABCDEF',
        superKey1Explanation: 'Since AF->B, and A->C, and B->D, CD->E, we can derive all attributes.',
        superKey2Explanation: 'Adding D still ensures all attributes.',
        superKey3Explanation: 'Since B is already given, it can give D, leading to all attributes.',
        superKey4Explanation: 'Since A->C and CD->E, we can reach all attributes.',
        superKey5Explanation: 'It includes all dependencies and hence, a valid SuperKey.',
        superKey6Explanation: 'Including all attributes, also is a SuperKey.',
        candidateKey1: 'AF',
        candidateKey1Explanation: 'For the First Example, let\'s take AF. The Proper Subsets of AF will be either A and F. Then, taking FD Closure of A and F separately wont give the whole attribute, hence AF is minimal. This gives us our first Candidate Key.',
        candidateKey2Explanation: 'Let\'s take ADF. The Proper Subsets of ADF are {A, D, F, AD, AF, DF}. From previous explanation, we get to know that, A and F can\'t be Candidate Key, hence AF is the Key. Taking FD Closure of D, AD and DF, we still won\'t get the whole relation. AF is still the only one Candidate Key we got.',
        candidateKey3Explanation: 'Similarly, let\'s take ABF. The Proper Subsets of ABF are {A, B, F, A B, AF, BF}. From previous explanations, we get to know that, A and F can\'t be Candidate Key, hence AF is the Key. Taking FD Closure of B, A B and BF, we still won\'t get the whole relation. AF is still the only one Candidate Key we got.',
        candidateKey4Explanation: 'Similarly, let\'s take ACF. The Proper Subsets of ACF are {A, C, F, AC, AF, CF}. From previous explanations, we get to know that, A and F can\'t be Candidate Key, hence AF is the Key. Taking FD Closure of C, AC and CF, we still won\'t get the whole relation. AF is still the only one Candidate Key we got.',
        candidateKey5Explanation: 'Let\'s take ABCF. The Proper Subsets of ABCF are {A, B, C, F, A B, AC, AF, BC, BF, CF}. From previous explanations, we get to know that, A and F can\'t be Candidate Key, hence AF is the Key. Taking FD Closure of any other than these won\'t give us the whole relation.',
        candidateKey6Explanation: 'Let\'s take ABCDEF. This is the whole relation, and since we already have at least one Candidate Key, which is Proper Subset of ABCDEF, so this whole Relation together will never be considered minimal, hence not a Candidate Key.',
    }
]

export const SuperKeysExample2Json = [
    {
        relation: 'R(ABCDE)',
        fdSet: '[AB->C, AC->D, BD->E, CE->A]',
        superKey1: 'AB',
        superKey2: 'BD',
        superKey3: 'CE',
        superKey1Explanation: 'Since A B->C, and AC->D gives D, then BD->E gives E, covering all attributes.',
        superKey2Explanation: 'Since BD->E, and CE->A gives A, then A B->C gives C, and AC->D gives D, covering all attributes.',
        superKey3Explanation: 'Since CE->A, and A B->C gives C, then AC->D gives D, and BD->E gives E, covering all attributes.',
        candidateKey1: 'AB',
        candidateKey2: 'BD',
        candidateKey3: 'CE',
        candidateKey1Explanation: 'For the Second Example, let\'s take A B. The Proper Subsets of A B are {A, B}. If we take FD closure of A and B, none of them give out the whole relation, hence, A B is already minimal, that is, it\'s a Candidate Key.',
        candidateKey2Explanation: 'Similarly, let\'s take BD. The Proper Subsets of BD are {B, D}. If we take FD closure of B and D, none of them give out the whole relation, hence, BD is already minimal, that is, it\'s a Candidate Key.',
        candidateKey3Explanation: 'Similarly, let\'s take CE. The Proper Subsets of CE are {C, E}. If we take FD closure of C and E, none of them give out the whole relation, hence, CE is already minimal, that is, it\'s a Candidate Key.',
    }
]

export const goodCandidateKeysExample = [
    {
        id: 1,
        relation: 'R(ABCDE)',
        fdset: '[A->BC, CD->E, B->D, E->A]',
        candidateKeys: 'A, E, CD, CB',
        primeattributes: '{A, E, C, D, B}',
        nonkeyattributes: '{}',
        explanation1: 'When taking FD Closure of A, we got all attributes. Now check, which FD is giving A. From FD set, we can see, E gives A, hence it\'s FD Closure will have all attributes as well.',
        explanation2: 'Now, check which FD is giving E, and we see, CD is giving E. Now, remember the Golden Mantra, and take FD of C and D respectively. Since each separately won\'t give full Relation, hence CD is also another Candidate Key.',
        explanation3: 'Now check, which FD is giving C or D. We see B gives D, so if we replace B with D, and take closure of CB, we still get all attributes, and it\'s minimal as well. Hence CB is also a Candidate Key.',
        explanation4: 'Hence, we get, {A, E, CD, CB} as Candidate Keys, and the Prime/Key Attributes are {A, E, C, D, B}.',
    },
    {
        id: 1,
        relation: 'R(ABCDEFGHI)',
        fdset: '[AB->CD, D->EG, F->H, C->EF, H->A, G->B, A->B]',
        candidateKeys: 'AI, HI, FI, CI',
        primeattributes: '{A, H, F, C, I}',
        nonkeyattributes: '{B, D, E, G}',
        explanation0: 'In Example 2, notice that, there is one attribute, that doesnt participate in any Functional Dependency, "I". Hence all Candidate Keys of this relation will have "I" in it. So for time being, we will have Candidate Keys for Relation, assuming, I is not in the Relation.',
        explanation1: 'When taking FD Closure of A B, we got all attributes. Now, remember the Golden Mantra, break down to minimal, that is, take FD closure of A and B. We get all attributes from FD Closure of A, but not from B\'s FD Closure. Hence A is Candidate Key.',
        explanation2: 'Now, check which FD is giving A, and we see, H is giving A. Hence H is also another Candidate Key (as it\'s already minimal).',
        explanation3: 'Now check, which FD is giving H. We see F gives H, hence F is also another Candidate Key (as it\'s already minimal).',
        explanation4: 'Now check, which FD is giving F. We see C gives F, hence C is also another Candidate Key (as it\'s already minimal).',
        explanation5: 'Now check, which FD is giving C. We see C is given out by A B, and we have already taken this case before.',
        explanation6: 'So, we get, {A, H, F, C} as Candidate Keys, and the Prime/Key Attributes are {A, H, F, C}, for Relation without "I".',
        explanation7: 'Hence, after adding "I" attribute in all Candidate Keys, we get, {AI, HI, FI, CI} as Candidate Keys, and the Prime/Key Attributes are {A, H, F, C, I}.',
    }
]

export const practiceKeys = [
    {
        id: 1,
        level: 'Easy',
        question: 'Consider a relation schema R(VWXYZ) on which the following functional dependencies hold:',
        fdset: '[VY->W, WX->Z, ZY->V]',
        subquestion: 'Which is a candidate key of R among the following, and the prime/key attribute(s)?',
        options: [
            {value: 'A', label: 'VXZ; (V, X, Z)'},
            {value: 'B', label: 'VWXY; {V, W, X, Y}'},
            {value: 'C', label: 'VXY; (V, X, Y)'},
            {value: 'D', label: 'VWXYZ; {V, W, X, Y, Z}'}
        ],
        correctAnswer: 'C',
        help: [
            {
                explanation1: 'Simply take FD closure of each option, and get Minimal.',
            },
        ],
    },
    {
        id: 2,
        level: 'Difficult',
        question: 'Consider a relation schema R(ABCDEH) on which the following functional dependencies hold:',
        fdset: '[A->B, BC->D, E->C, D->A]',
        subquestion: 'What are the candidate keys of R, and the prime/key attributes?',
        options: [
            {value: 'A', label: 'AE, BE; (A, E, B)'},
            {value: 'B', label: 'AE, BD, DE; (A, B, E, D)'},
            {value: 'C', label: 'AEH, BEH, BCH; {A, B, C, E, H}'},
            {value: 'D', label: 'AEH, BEH, DEH; {A, B, D, E, H}'}
        ],
        correctAnswer: 'D',
        help: [
            {
                explanation1: 'Notice there might be an attribute not in FD Set.',
                explanation2: 'Get one Candidate Key, and remember The Golden Mantra, everytime. And if one attribute is not there in FD set, add it in the Candidate Keys got, with consideration that, the attribute was never there.',
            },
        ],
    }
];

export const WhatNormalisationData = [
    {
        id: 1,
        explanation: 'Bigger Relations are always in 1NF. It has the most redundancy. It\'s basically the whole combination of all the attributes. This takes up lots of space, reducing efficiency.'
    },
    {
        id: 2,
        image: nf2,
        form: 'Violations for Normal Form 2, 2NF',
        how: 'Let\'s Discuss, how can we identify, if the given relation is in 2NF or not.',
        explanation: 'To identify the violation for 2NF, we see, if there is any Proper Subset of Candidate Key, that gives, Non Key Attribute in the FD Set. This is known as Partial Dependency, and hence in 2NF Decomposition, we remove Partial Dependency.'
    },
    {
        id: 3,
        image: nf3,
        form: 'Violations for Normal Form 3, 3NF',
        how: 'Let\'s Discuss, how can we identify, if the given relation is in 3NF or not.',
        explanation1: 'To identify the violation for 3NF, we see, if there is any Non Key Attribute, that gives, any other Non Key Attribute in the FD Set. This is known as Transitive Dependency, and hence in 3NF Decomposition, we remove Transitive Dependency.',
        explanation2: 'In 3NF, it\'s ensured that, the determinant is either a Super Key, or a Prime/Key Attribute.'
    },
    {
        id: 4,
        image: bcnf,
        form: 'Violations for Boyce-Codd Normal Form, BCNF',
        how: 'Let\'s Discuss, how can we identify, if the given relation is in BCNF or not.',
        explanation1: 'To identify the violation for BCNF, we see, if there is any Proper Subset of Candidate Key, that gives, any other Proper Subset of Candidate Key in the FD Set. This ensures complete removal of any kind of dependencies, if were left.',
        explanation2: 'In BCNF, it\'s ensured that, every determinant is a Super Key.'
    }
]

export const NormalisationExample1 = {
    Relation: 'R(ABCDEFGHIJ)',
    fdSet: '[AB->C, A->DE, B->F, F->GH, D->IJ]',
    CandidateKey: 'AB',
    KeyAttribute: '{A, B}',
    NonKeyAttributes: '{C, D, E, F, G, H, I, J}',
    Nf2Violationg: '[A->DE, B->F]',
    ClosureAB: 'ABC',
    ClosureA: 'ADEIJ',
    ClosureB: 'BFGH',
    Nf2Identification: 'In this relation, A B is the Candidate Key of Given relation. As for 2NF, the given relation violates, due to the presence of Partial Dependency. The Proper Subsets of Candidate Key A B, A and B, both are violating (A-> (gives) D E and B-> (gives) F).',
    Nf2Decomposition: 'R1(ABC), R2(ADEIJ), R3(BFGH)',
    Nf2DecompositionExplanation: 'It\'s simple to decompose a given relation to 2NF. To decompose the given relation to 2NF, check for the FDs that are violating. Then, when we take FD Closure of the determinant (LHS of FD), that Closure, as a whole is said to be one Separate Relation. Hence we get three new decomposed Relations.',
    Nf3Violationg: '[D->IJ, F->GH]',
    ClosureD: 'DIJ',
    ClosureF: 'FGH',
    Nf3Identification: 'As for 3NF, the given relation violates, due to the presence of Transitive Dependency. The NonKey attributes, D and F are violating (D-> (gives) IJ and F-> (gives) GH).',
    Nf3Decomposition: 'R1(ABC), R2(ADE), R3(DIJ), R4(BF), R5(FGH)',
    Nf3DecompositionExplanation1: 'To decompose relations into 3NF, we will refer the relations that we got in 2NF. When we see that the determinant violating 3NF in a particular Relation, we will focus on that particular Relation. And then, from that relation, we will remove the whole FD Closure of the Violating determinant, except the determinant itself, and the FD Closure will be the new relation.',
    Nf3DecompositionExplanation2: 'For Example, the violating FD is D-> (gives) IJ, so, when we take FD Closure of determinant "D", we get, DIJ. Now, we can see, D is in relation, R2(ADEIJ) that we got from 2NF Decomposition, so we will remove "IJ", and keep D in the relation, and decompose a new relation R3, that will have the FD Closure of determinant D, that is, R3(DIJ). Same for the violating determinant, F.',
    BCNFDecomposition: 'For BCNF Decomposition, we have no FD Violating.',
    BCNFDecompositionExplanation: 'For BCNF Decomposition, we have no FD Violating, in this case. Hence it\'s in BCNF as well. Let\'s take another example to understand BCNF Decomposition.'
}

export const NormalisationExample2 = {
    Relation: 'R(ABCD)',
    fdSet: '[AB->CD, D->A]',
    CandidateKey: 'AB, DB',
    KeyAttribute: '{A, B, D}',
    NonKeyAttributes: '{C}',
    BcnfViolation: '[D->A]',
    ClosureD: 'DA',
    BcnfDecomposition: 'R1(BCD), R2(DA)',
    BcnfDecompositionExplanation1: 'In this Relation, The decomposition of a relation, in BCNF, is same as 3NF. Check for violating determinant, take the FD Closure of it, remove the attributes from the existing relation coming in FD Closure of the determinant, except the determinant itself, and decompose a new relation with FD Closure of the determinant.',
    BcnfDecompositionExplanation2: 'Here, the existing table is R(ABCD). The determinant D is causing the violation, so we remove the attribute, as it\'s in FD closure of D, except D, giving us a relation, R1(BCD). Then, the new relation after decomposition is, R2(D A).'
}

export const NormalFormTest = {
    RelationName: 'R(House)',
    Relation: 'R(Person ID, Location, Action, Room Type, Room Contents, Camera ID, Camera Status, Camera Footage, Time, Witness Statement)',
    fdSet: '{Person ID, Location} -> {Action}, {Person ID} -> {Room Type, Room Contents}, {Location} -> {Camera ID}, {Camera ID} -> {Camera Status, Camera Footage}, {Room Type} -> {Time, Witness Statement}',
    Nf2Rel: [
        'Person ID, Location, Action',
        'Person ID, Room Type, Room Contents, Time, Witness Statement',
        'Location, Camera ID, Camera Status, Camera Footage'
    ],
    Nf3Rel: [
        'Person ID, Location, Action',
        'Person ID, Room Type, Room Contents',
        'Room Type, Time, Witness Statement',
        'Location, Camera ID',
        'Camera ID, Camera Status, Camera Footage'
    ]
};

export const useVoiceSynthesis1 = (type, value, show) => {
    const [voices, setVoices] = useState([]);

    // Load available voices properly
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
            } else {
                // Retry after a delay
                setTimeout(() => {
                    setVoices(window.speechSynthesis.getVoices());
                }, 100);
            }
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    useEffect(() => {
        if (!show || voices.length === 0) return;

        // Select voice based on type
        // let selectedVoice = voices.find(voice => voice.name.includes("Google UK English Female")) || voices[0];
        let selectedVoice = voices.find(voice => voice.name.includes("Microsoft Zira")) || voices[0];
        // if (type === "female") {
        //     selectedVoice = voices.find(voice => voice.name.includes("Google UK English Female")) || voices[0];
        // }
        if (type === "boss") {
            selectedVoice = voices.find(voice => voice.name.includes("Microsoft David")) || voices[0];
        } else if (type === "junior") {
            // selectedVoice = voices.find(voice => voice.name.includes("Google UK English Male")) || voices[0];
            selectedVoice = voices.find(voice => voice.name.includes("Microsoft Mark")) || voices[0];
        }

        if (!selectedVoice) return;

        // Split the text into smaller chunks
        const chunkSize = 200; // Adjust chunk size as needed
        const textChunks = splitTextIntoChunks(value, chunkSize);

        // Speak each chunk sequentially
        let currentChunkIndex = 0;

        const speakNextChunk = () => {
            if (currentChunkIndex >= textChunks.length) return;

            const utterance = new SpeechSynthesisUtterance(textChunks[currentChunkIndex]);
            utterance.voice = selectedVoice;

            // When the current chunk finishes, move to the next one
            utterance.onend = () => {
                currentChunkIndex++;
                speakNextChunk();
            };

            window.speechSynthesis.speak(utterance);
        };

        // Start speaking the first chunk
        speakNextChunk();

        // Cleanup function
        return () => {
            window.speechSynthesis.cancel(); // Stop speech when unmounted
        };
    }, [show, type, value, voices]);

    // Helper function to split text into chunks
    const splitTextIntoChunks = (text, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.slice(i, i + chunkSize));
        }
        return chunks;
    };
};

export const useVoiceSynthesis2 = (type, value, show, setDisplayText, onEnd) => {
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        const loadVoices = () => {
            setVoices(window.speechSynthesis.getVoices());
        };
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    useEffect(() => {
        if (!show || !value || voices.length === 0) return;

        let selectedVoice = voices.find(voice => voice.name.includes("Microsoft Zira")) || voices[0];
        if (type === "boss") {
            selectedVoice = voices.find(voice => voice.name.includes("Microsoft David")) || voices[0];
        } else if (type === "junior") {
            selectedVoice = voices.find(voice => voice.name.includes("Microsoft Mark")) || voices[0];
        }

        setDisplayText("");
        const utterance = new SpeechSynthesisUtterance(value);
        utterance.voice = selectedVoice;

        const words = value.split(" ");
        let wordIndex = -1;

        utterance.onboundary = (event) => {
            if (event.name === "word" && wordIndex < words.length) {
                setDisplayText(prev => prev ? `${prev} ${words[wordIndex]}` : words[wordIndex]);
                wordIndex++;
            }
        };

        utterance.onend = onEnd;

        window.speechSynthesis.speak(utterance);

        return () => {
            window.speechSynthesis.cancel();
        };
    }, [show, type, value, voices]);
};

export const useVoiceSynthesis = (type, value, show, setDisplayText, onEnd) => {
    const [voices, setVoices] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    // Check for SpeechSynthesis support at the top level
    const isSpeechSynthesisSupported = !!window.speechSynthesis;

    // Load voices and set the state when available
    useEffect(() => {
        if (!isSpeechSynthesisSupported) return; // Early return inside useEffect is fine

        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
                setVoicesLoaded(true);
            }
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices(); // Initial call to load voices

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [isSpeechSynthesisSupported]); // Add dependency

    // Speak the text and update display text word by word when the component is mounted
    useEffect(() => {
        if (!isSpeechSynthesisSupported || !show || !value || !voicesLoaded) return; // Early return inside useEffect is fine

        const utterance = new SpeechSynthesisUtterance(value);
        let selectedVoice = voices.find((voice) => voice.name.includes("Microsoft Zira")) || voices[0];

        if (!selectedVoice) {
            console.warn("Desired voice not found. Using default voice.");
            selectedVoice = voices[0]; // Fallback to the first available voice
        }

        utterance.voice = selectedVoice;

        // Reset the display text before starting speech
        setDisplayText("");

        const words = value.split(" ");
        let wordIndex = 0;

        utterance.onboundary = (event) => {
            if (event.name === "word" && wordIndex < words.length) {
                setDisplayText((prev) => (prev ? `${prev} ${words[wordIndex]}` : words[wordIndex]));
                wordIndex++;
            }
        };

        utterance.onend = () => {
            onEnd();
        };

        window.speechSynthesis.speak(utterance);

        return () => {
            // Cancel the speech synthesis if the component unmounts or the effect is rerun
            window.speechSynthesis.cancel();
        };
    }, [show, value, voicesLoaded, setDisplayText, onEnd, isSpeechSynthesisSupported, voices]); // Add dependencies
};

// export const useVoiceSynthesis = (type, value, show) => {
//     const [voices, setVoices] = useState([]);
//
//     // Load available voices properly
//     useEffect(() => {
//         const loadVoices = () => {
//             const availableVoices = window.speechSynthesis.getVoices();
//             if (availableVoices.length > 0) {
//                 setVoices(availableVoices);
//             } else {
//                 // Retry after a delay
//                 setTimeout(() => {
//                     setVoices(window.speechSynthesis.getVoices());
//                 }, 100);
//             }
//         };
//
//         window.speechSynthesis.onvoiceschanged = loadVoices;
//         loadVoices();
//     }, []);
//
//     useEffect(() => {
//         if (!show || voices.length === 0) return;
//
//         // Select voice based on type
//         let selectedVoice = voices.find(voice => voice.name.includes("Google UK English Female")) || voices[0];
//         if (type === "boss") {
//             selectedVoice = voices.find(voice => voice.name.includes("Microsoft David")) || voices[0];
//         } else if (type === "junior") {
//             selectedVoice = voices.find(voice => voice.name.includes("Google UK English Male")) || voices[0];
//         }
//
//         if (!selectedVoice) return;
//
//         // Speak the text
//         const utterance = new SpeechSynthesisUtterance(value);
//         utterance.voice = selectedVoice;
//         window.speechSynthesis.speak(utterance);
//
//         return () => {
//             window.speechSynthesis.cancel(); // Stop speech when unmounted
//         };
//     }, [show, type, value, voices]);
// };

export const useBackgroundMusic = (bgm) => {
    const [audio] = useState(new Audio(bgm));

    useEffect(() => {
        const fadeInDuration = 3000; // 3 seconds for fade-in
        const fadeOutDuration = 2000; // 2 seconds for fade-out
        const steps = 30; // Number of steps for smooth transition
        const intervalTimeIn = fadeInDuration / steps; // Time per step for fade-in
        const intervalTimeOut = fadeOutDuration / steps; // Time per step for fade-out
        const targetVolume = 0.04; // Max volume: 4% (0.04)

        const fadeIn = () => {
            audio.loop = true;
            audio.volume = 0; // Start at volume 0
            audio.play().catch(error => console.error("Autoplay failed:", error));

            let currentStep = 0;
            const fadeInterval = setInterval(() => {
                if (currentStep < steps) {
                    audio.volume = (currentStep / steps) * targetVolume; // Gradually increase volume
                    currentStep++;
                } else {
                    clearInterval(fadeInterval);
                }
            }, intervalTimeIn);
        };

        const fadeOut = () => {
            let currentStep = steps;
            const fadeInterval = setInterval(() => {
                if (currentStep > 0) {
                    audio.volume = (currentStep / steps) * targetVolume; // Gradually decrease volume
                    currentStep--;
                } else {
                    clearInterval(fadeInterval);
                    audio.pause();
                }
            }, intervalTimeOut);
        };

        // Play music only when the user interacts (e.g., clicks anywhere)
        const handleUserInteraction = () => {
            fadeIn();
            document.removeEventListener("click", handleUserInteraction);
        };

        document.addEventListener("click", handleUserInteraction);

        return () => {
            fadeOut();
            document.removeEventListener("click", handleUserInteraction);
        };
    }, [audio]);

    return audio; // Return audio if needed
};

export const ProgressStars = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const email = localStorage.getItem("loggedinuseremail") || sessionStorage.getItem("loggedinuseremail");

        if (email) {
            axios.get(`http://${username}/progress/${email}`)
                .then(response => {
                    setProgress(response.data); // Store progress directly
                })
                .catch(error => {
                    console.error("Error fetching progress:", error);
                });
        }
    }, []);

    const fullStars = Math.floor(progress); // Fully filled stars
    const decimalPart = progress - fullStars; // Decimal part for partial fill
    const stars = Array(7).fill(0); // 7 stars

    return (
        <div className="mx-4 flex gap-1">
            {stars.map((_, index) => (
                <div key={index} className="relative w-8 h-8">
                    {/* Empty Star */}
                    <IoIosStar className="absolute text-gray-400 w-full h-full" />

                    {/* Fully Filled Star */}
                    {index < fullStars && (
                        <IoIosStar className="absolute text-[#f5bf03] w-full h-full" />
                    )}

                    {/* Partially Filled Star */}
                    {index === fullStars && decimalPart > 0 && (
                        <div className="absolute w-full h-full">
                            <IoIosStar
                                className="absolute text-[#f5bf03] w-full h-full"
                                style={{
                                    clipPath: `inset(0 ${(1 - decimalPart) * 100}% 0 0)` // Clip the star itself
                                }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export const updateProgress = async (value) => {
    const email = localStorage.getItem("loggedinuseremail") || sessionStorage.getItem("loggedinuseremail");

    if (!email) {
        alert("User not logged in!");
        return;
    }

    try {
        const response = await axios.put(`http://${username}/updateProgress`, {
            email: email,
            progress: value  // Use the dynamic value here
        });

    } catch (error) {
        console.error("Error updating progress:", error);
        alert("Failed to update progress");
    }
};

export const SQLTest1 = {
    RelationName: 'R(employees)',
    Relation: 'R(employee_id, first_name, last_name, department, position, salary, age, joining_date, performance_rating, active)',
    Questions: [
        {
            id: 1,
            concept: 'SELECT',
            question: 'Retrieve all employee\'s first names, last names and departments.',
            query: 'SELECT first_name, last_name, department FROM employees;',
            validation: ['select', 'from', 'employees', 'first_name', 'last_name', 'department']
        },
        {
            id: 2,
            concept: 'WHERE',
            question: 'Find employees in the IT department.',
                query: 'SELECT * FROM employees WHERE department = "IT";',
            validation: ['select', 'from', 'employees', 'where', 'department', 'it']
        },
        {
            id: 3,
            concept: 'ORDER BY',
            question: 'List employees sorted by salary in descending order.',
            query: 'SELECT * FROM employees ORDER BY salary DESC;',
            validation: ['select', 'from', 'employees', 'order by', 'salary', 'desc']
        },
        {
            id: 4,
            concept: 'AND',
            question: 'Get employees in IT with a performance rating of 4 or higher.',
            query: 'SELECT * FROM employees WHERE department = "IT" AND performance_rating >= 4;',
            validation: ['select', 'from', 'employees', 'where', 'and', 'department', 'performance_rating', 'it', '4']
        },
        {
            id: 5,
            concept: 'OR',
            question: 'Find employees in either HR or Marketing.',
            query: 'SELECT * FROM employees WHERE department = "HR" OR department = "Marketing";',
            validation: ['select', 'from', 'employees', 'where', 'or', 'department', 'hr', 'marketing']
        },
        {
            id: 6,
            concept: 'DISTINCT',
            question: 'List all unique departments.',
            query: 'SELECT DISTINCT department FROM employees;',
            validation: ['select', 'distinct', 'department', 'from', 'employees']
        },
        {
            id: 7,
            concept: 'NOT',
            question: 'Get employees who are not active.',
            query: 'SELECT * FROM employees WHERE active NOT LIKE true;',
            validation: ['select', 'from', 'employees', 'where', 'not', 'active', 'like']
        },
        {
            id: 8,
            concept: 'GROUP BY',
            question: 'Count the number of employees in each department.',
            query: 'SELECT department, COUNT(*) FROM employees GROUP BY department;',
            validation: ['select', 'count', 'from', 'employees', 'group by', 'department']
        },
        {
            id: 9,
            concept: 'HAVING',
            question: 'Count departments with more than 2 employees.',
            query: 'SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 2;',
            validation: ['select', 'count', 'from', 'employees', 'group by', 'having', 'department', '2']
        },
        {
            id: 10,
            concept: 'MAX',
            question: 'Find the highest salary.',
            query: 'SELECT MAX(salary) FROM employees;',
            validation: ['select', 'max', 'from', 'employees', 'salary']
        },
        {
            id: 11,
            concept: 'MIN',
            question: 'Find the lowest performance rating.',
            query: 'SELECT MIN(performance_rating) FROM employees;',
            validation: ['select', 'min', 'from', 'employees', 'performance_rating']
        },
        {
            id: 12,
            concept: 'COUNT',
            question: 'Count all employees.',
            query: 'SELECT COUNT(*) FROM employees;',
            validation: ['select', 'count', 'from', 'employees']
        },
        {
            id: 13,
            concept: 'SUM',
            question: 'Calculate the total salary of all employees.',
            query: 'SELECT SUM(salary) FROM employees;',
            validation: ['select', 'sum', 'from', 'employees', 'salary']
        },
        {
            id: 14,
            concept: 'AVG',
            question: 'Find the average employee age.',
            query: 'SELECT AVG(age) FROM employees;',
            validation: ['select', 'avg', 'from', 'employees', 'age']
        }
    ]
};
