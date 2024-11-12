# Data Transformation Tool

## Description

This project provides a utility to transform a given string structure into hierarchical data formats. Given an input string with nested fields, it outputs two formats of the data in both JSON-like hierarchical structures and Markdown-styled lists.

## Input

The input is a string representing a nested data structure:


## Expected Outputs

The program should convert the input to two different output formats, as follows:

### Output 1: Markdown List Format
```
- id
- name
- email
- type
  - id
  - name
  - customFields
    - c1
    - c2
    - c3
- externalId
```

### Output 2: Markdown List Format
```
- email
- externalId
- id
- name
- type
  - customFields
    - c1
    - c2
    - c3
  - id
  - name
```


### Solutions
Two approaches are provided for generating the outputs:

Brute Force Solution: A straightforward solution that manually parses and orders the data.
Dynamic Solution: A more adaptable and efficient solution that parses the structure dynamically.

### Installation and Usage
Clone this repository.

Install dependencies and run:
- `npm install`
- `npx tsc`
- `node index.js`