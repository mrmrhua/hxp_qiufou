"""up

Revision ID: 14afc185ba1f
Revises: e1e18bd069ef
Create Date: 2017-10-20 13:55:26.868171

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '14afc185ba1f'
down_revision = 'e1e18bd069ef'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('lastvisited',
    sa.Column('user_id', mysql.INTEGER(unsigned=True), nullable=True),
    sa.Column('demand_id', mysql.INTEGER(unsigned=True), nullable=True),
    sa.ForeignKeyConstraint(['demand_id'], ['demands.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('lastvisited')
    # ### end Alembic commands ###