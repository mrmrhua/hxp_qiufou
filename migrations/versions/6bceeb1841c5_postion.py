"""postion

Revision ID: 6bceeb1841c5
Revises: 1a35b65c3740
Create Date: 2017-08-12 20:39:15.029549

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '6bceeb1841c5'
down_revision = '1a35b65c3740'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('experiences', 'position')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('experiences', sa.Column('position', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
