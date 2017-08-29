"""m-to-m

Revision ID: 814ff026e749
Revises: 
Create Date: 2017-08-22 16:17:22.421455

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '814ff026e749'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('notices',
    sa.Column('id', mysql.INTEGER(unsigned=True), nullable=False),
    sa.Column('content', sa.Text(), nullable=True),
    sa.Column('up_time', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('subscribtion',
    sa.Column('notice_id', mysql.INTEGER(unsigned=True), nullable=False),
    sa.Column('user_id', mysql.INTEGER(unsigned=True), nullable=False),
    sa.Column('isread', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['notice_id'], ['notices.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('notice_id', 'user_id')
    )
    op.drop_column('categories_users', 'categories_users')
    op.drop_column('categories_users', 'id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('categories_users', sa.Column('id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
    op.add_column('categories_users', sa.Column('categories_users', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
    op.drop_table('subscribtion')
    op.drop_table('notices')
    # ### end Alembic commands ###