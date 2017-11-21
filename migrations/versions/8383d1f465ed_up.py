"""up

Revision ID: 8383d1f465ed
Revises: 7db827bec3ba
Create Date: 2017-11-17 21:47:33.052509

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '8383d1f465ed'
down_revision = '7db827bec3ba'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tb_design')
    op.drop_table('tb_case')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tb_case',
    sa.Column('id', mysql.BIGINT(display_width=20), nullable=False),
    sa.Column('cover', mysql.VARCHAR(length=512), nullable=False),
    sa.Column('title', mysql.VARCHAR(length=128), nullable=False),
    sa.Column('description', mysql.VARCHAR(length=1024), nullable=False),
    sa.Column('date', mysql.DATETIME(), nullable=False),
    sa.Column('content', mysql.TEXT(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    mysql_comment='????',
    mysql_default_charset='utf8',
    mysql_engine='InnoDB'
    )
    op.create_table('tb_design',
    sa.Column('id', mysql.BIGINT(display_width=20), nullable=False),
    sa.Column('title', mysql.VARCHAR(length=128), nullable=False),
    sa.Column('date', mysql.DATETIME(), nullable=False),
    sa.Column('content', mysql.TEXT(), nullable=False),
    sa.Column('description', mysql.VARCHAR(length=1024), nullable=False),
    sa.Column('cover', mysql.VARCHAR(length=512), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    mysql_comment='????',
    mysql_default_charset='utf8',
    mysql_engine='InnoDB'
    )
    # ### end Alembic commands ###