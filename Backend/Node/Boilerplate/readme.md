# Vehicle fleet parking management

I have a vehicle fleet and I want to manage where every vehicle is parked.

# About the project

I made this project as part of a technical interview.

# Getting started

## Requirements

To run this project you will need a computer with Node and Yarn.

## Installation

1. Clone the repo:

```
$ git clone https://github.com/lololau/fulll
```

2. Install packages:

```
$ yarn install
```

## Commands (usage)

You have to run from your terminal at the root of the backend project in `Backend/Node/Boilerplate`

1. Create user

```
$ ./fleet create-user # returns userId on the standard output
```

2. Create fleet (you will need to launch the previous command to get a userId)

```
$ ./fleet create <userId> # returns fleetId on the standard output
```

3. Register a vehicle in a specific fleet (you will need to launch the previous command to get a fleetId)

```
$ ./fleet register-vehicle <fleetId> <vehiclePlateNumber>
```

4. Add location to a vehicle

```
$ ./fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng
```

## Running tests

Go to `Backend/Node/Boilerplate` and run:

```
$ yarn test
```

## Database

### Creation

The database is automatically created when you launch a command on your terminal.
It will create a `main.db` file in your current directory.

### Cleaning

To clean the database, simply remove `main.db` file.
You can for example run in the directory where the file exists:

```
$ rm main.db
```

## Quality code

### Formatter

To improve quality code, i use in this project **Prettier**.
It is a simple but powerful tool to format your code.

### CI process

In this project, i'm using a CI process to maintain quality and consistency.
It is helpfull to prevent regressions.

- test job: run the tests
- lint job: check if there is any lint issue and failed or passed the job

# Project structure

```
Backend/Node/Boilerplate
├── fleet           # bash file to execute command shell script
├── features        # contains all tests (features files, steps definitions)
└── src
    ├── App         # contains all commands
    ├── Domain      # contains all type structures
    ├── Infra       # contains all database implementation
    └── fleet.ts    # file that contains cli commands
```
