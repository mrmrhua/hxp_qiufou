"""up

Revision ID: a524669082ea
Revises: 03153a0f61c3
Create Date: 2017-09-25 21:05:06.534374

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'a524669082ea'
down_revision = '03153a0f61c3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('colors',
    sa.Column('id', mysql.INTEGER(unsigned=True), nullable=False),
    sa.Column('color_val', sa.String(length=8), nullable=True),
    sa.Column('color_name', sa.String(length=4), nullable=True),
    sa.Column('color_desc', sa.String(length=64), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('colors_tags',
    sa.Column('color_id', mysql.INTEGER(unsigned=True), nullable=True),
    sa.Column('tag_id', mysql.INTEGER(unsigned=True), nullable=True),
    sa.ForeignKeyConstraint(['color_id'], ['colors.id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('colors_tags')
    op.drop_table('colors')
    # ### end Alembic commands ###
