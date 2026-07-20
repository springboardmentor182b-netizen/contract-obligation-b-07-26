import psycopg2


def get_connection():
    return psycopg2.connect(
        host="localhost",
        database="contractiq",
        user="postgres",
        password="9896224545",
        port="5432",
    )