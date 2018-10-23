DROP TABLE ZUKEMPLOYEE;
DROP TABLE REIMBURSEMENT;

CREATE TABLE ZUKEMPLOYEE (
    EMP_ID NUMBER(8) CONSTRAINT PK_EMP PRIMARY KEY,
    EMP_NAME VARCHAR2(50),
    EMP_POSITION VARCHAR2(30),
    EMP_USERNAME VARCHAR2(30),
    EMP_PASSWORD VARCHAR2(64), --possible encryption but maybe not
    REPORTS_TO NUMBER(8)
);

drop table reimbursement;

CREATE TABLE REIMBURSEMENT (
    REIMBURSEMENT_ID NUMBER(8) CONSTRAINT PK_RMBRS PRIMARY KEY,
    REIMBURSEMENT_DESC VARCHAR2(250), --text field for employee to describe reimbursement reason
    REIMBURSEMENT_STATUS VARCHAR(20),
    REIMBURSEMENT_AMT NUMBER(8,2),
    SUBMIT_DATE DATE,
    REIMBURSEMENT_HANDLER NUMBER(8),
    EMP_ID NUMBER(8) CONSTRAINT FK_RMBRS_EMP REFERENCES ZUKEMPLOYEE
);

INSERT INTO ZUKEMPLOYEE VALUES (1, 'Elmo Pigdon', 'Internal Auditor', 'epigdon0', 'dIEbmFAApaAR', 6);
INSERT INTO ZUKEMPLOYEE VALUES (2, 'Rozella Luscombe', 'Director of Sales', 'rluscombe1', '53QLl8a', 10);
INSERT INTO ZUKEMPLOYEE VALUES (3, 'Nana Greydon', 'Desktop Support Technician', 'ngreydon2', 'kWDj2KiG9Wz', 6);
INSERT INTO ZUKEMPLOYEE VALUES (4, 'Tersina Stowe', 'Compensation Analyst', 'tstowe3', 'w2vjusSLvqaO', 6);
INSERT INTO ZUKEMPLOYEE VALUES (5, 'Bernie Chmarny', 'Senior Financial Analyst', 'bchmarny4', 'VQzALrxNr', 6);
INSERT INTO ZUKEMPLOYEE VALUES (6, 'Gordie Gornar', 'Senior Financial Analyst', 'ggornar5', 'rXKHo5', NULL);
INSERT INTO ZUKEMPLOYEE VALUES (7, 'Xymenes Sharland', 'Teacher', 'xsharland6', 'V2WHecm', 10); 
INSERT INTO ZUKEMPLOYEE VALUES (8, 'Iorgo Bresson', 'Engineer I', 'ibresson7', '4aT4SS', 10);
INSERT INTO ZUKEMPLOYEE VALUES (9, 'Leupold Poat', 'Chief Design Engineer', 'lpoat8', 'GSnyL2', 10);
INSERT INTO ZUKEMPLOYEE VALUES (10, 'Rubin Rawles', 'Marketing Manager', 'rrawles9', 'EdMmDmjv', NULL); 

INSERT INTO REIMBURSEMENT values (100, 'Centralized grid-enabled benchmark', 'APPROVED', 110.45, DATE'2018-07-05', 6, 1);
INSERT INTO REIMBURSEMENT values (102, 'Enterprise-wide system-worthy groupware', 'PENDING', 881.66, DATE'2018-08-31', 6, 2);
INSERT INTO REIMBURSEMENT values (103, 'Progressive hybrid conglomeration', 'APPROVED', 1929.43, DATE'2018-06-07', 10, 3);
INSERT INTO REIMBURSEMENT values (104, 'De-engineered discrete ability', 'REJECTED', 85.58, DATE'2018-08-18', 10, 4);
INSERT INTO REIMBURSEMENT values (105, 'Extended dynamic structure', 'PENDING', 4800.43, DATE'2018-07-10', 10, 5);
INSERT INTO REIMBURSEMENT values (106, 'Front-line client-driven software', 'APPROVED', 393.94, DATE'2018-06-03', 6, 7);
INSERT INTO REIMBURSEMENT values (107, 'Cross-platform fault-tolerant frame', 'REJECTED', 2653.85, DATE'2018-07-29', 10, 8);
INSERT INTO REIMBURSEMENT values (108, 'Integrated modular standardization', 'PENDING', 1170.59, DATE'2018-07-20', 10, 9);
INSERT INTO REIMBURSEMENT values (109, 'Profound clear-thinking interface', 'REJECTED', 119.07, DATE'2018-07-12', 10, 1);
INSERT INTO REIMBURSEMENT values (110, 'Object-based zero defect support', 'APPROVED', 915.94, DATE'2018-08-22', 10, 2);
INSERT INTO REIMBURSEMENT values (111, 'Enterprise-wide web-enabled adapter', 'PENDING', 3699.71, DATE'2018-07-07', 6, 3);
INSERT INTO REIMBURSEMENT values (112, 'Profit-focused logistical standardization', 'REJECTED', 4285.71, DATE'2018-07-14', 6, 4);
INSERT INTO REIMBURSEMENT values (113, 'Total homogeneous productivity', 'REJECTED', 1683.68, DATE'2018-06-23', 10, 5);
INSERT INTO REIMBURSEMENT values (114, 'Focused encompassing hub', 'PENDING', 1041.07, DATE'2018-08-31', 6, 7);
INSERT INTO REIMBURSEMENT values (115, 'Centralized 24 hour projection', 'PENDING', 505.69, DATE'2018-07-06', 6, 8);

COMMIT;

DROP SEQUENCE SQ_REIMBURSEMENT_PK;
DROP TRIGGER NEW_EMPLOYEE_SUBMIT_DATE;

DROP SEQUENCE SQ_REIMBURSEMENT_PK;
DROP TRIGGER TR_INSERT_REIMBURSEMENT;

--CREATE SEQUENCE SQ_REIMBURSEMENT_PK
--START WITH 11
--INCREMENT BY 1;

CREATE OR REPLACE TRIGGER NEW_EMPLOYEE_SUBMIT_DATE
BEFORE INSERT 
ON REIMBURSEMENT 
FOR EACH ROW
DECLARE TODAY DATE;
BEGIN
    TODAY := SYSDATE;
    :NEW.SUBMIT_DATE := TODAY;
END;
/

CREATE SEQUENCE SQ_REIMBURSEMENT_PK
START WITH 116
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER TR_INSERT_REIMBURSEMENT
BEFORE INSERT ON REIMBURSEMENT
FOR EACH ROW 
BEGIN
    SELECT SQ_REIMBURSEMENT_PK.NEXTVAL INTO :NEW.REIMBURSEMENT_ID FROM DUAL;
END;
/

COMMIT;

select * from reimbursement;

select * from zukemployee;

SELECT * FROM ZUKEMPLOYEE
WHERE EMP_ID != REPORTS_TO;

SELECT EMP_PASSWORD
FROM ZUKEMPLOYEE
WHERE EMP_ID = 3;

--INSERT INTO REIMBURSEMENT(REIMBURSEMENT_DESC, REIMBURSEMENT_STATUS, REIMBURSEMENT_AMT, REIMBURSEMENT_HANDLER, EMP_ID) values ('I need the money', 'PENDING', 50.69,6, 8);