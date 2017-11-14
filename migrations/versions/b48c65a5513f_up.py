"""up

Revision ID: b48c65a5513f
Revises: 089fe8623ba8
Create Date: 2017-11-11 21:11:46.971273

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'b48c65a5513f'
down_revision = '089fe8623ba8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('projects', sa.Column('isnew', sa.Boolean(), nullable=True))
    op.add_column('projects', sa.Column('status', mysql.INTEGER(unsigned=True), nullable=True))
    op.add_column('projects', sa.Column('up_time', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('projects', 'up_time')
    op.drop_column('projects', 'status')
    op.drop_column('projects', 'isnew')
    # ### end Alembic commands ###
