"""initial migration

Revision ID: 51ad7378dbd2
Revises: 
Create Date: 2017-08-08 20:45:19.363368

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '51ad7378dbd2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'albums', 'users', ['user_id'], ['id'])
    op.create_foreign_key(None, 'applyforms', 'users', ['unionid'], ['unionid'])
    op.create_foreign_key(None, 'applyworks', 'applyforms', ['apply_id'], ['id'])
    op.create_foreign_key(None, 'categories', 'applyforms', ['apply_id'], ['id'])
    op.create_foreign_key(None, 'categories_users', 'users', ['user_id'], ['id'])
    op.create_foreign_key(None, 'demands_users', 'users', ['user_id'], ['id'])
    op.create_foreign_key(None, 'demands_users', 'demands', ['demand_id'], ['id'])
    op.create_foreign_key(None, 'designers', 'users', ['user_id'], ['id'])
    op.create_foreign_key(None, 'designworks', 'albums', ['album_id'], ['id'])
    op.create_foreign_key(None, 'designworks', 'users', ['user_id'], ['id'])
    op.create_foreign_key(None, 'historywork', 'milestones', ['milestone_id'], ['id'])
    op.alter_column('milestones', 'cl_status',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True,
               existing_server_default=sa.text("'0'"))
    op.alter_column('milestones', 'de_status',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True,
               existing_server_default=sa.text("'0'"))
    op.alter_column('milestones', 'pro_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=True)
    op.create_foreign_key(None, 'milestones', 'projects', ['pro_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'milestones', type_='foreignkey')
    op.alter_column('milestones', 'pro_id',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False)
    op.alter_column('milestones', 'de_status',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False,
               existing_server_default=sa.text("'0'"))
    op.alter_column('milestones', 'cl_status',
               existing_type=mysql.INTEGER(display_width=11),
               nullable=False,
               existing_server_default=sa.text("'0'"))
    op.drop_constraint(None, 'historywork', type_='foreignkey')
    op.drop_constraint(None, 'designworks', type_='foreignkey')
    op.drop_constraint(None, 'designworks', type_='foreignkey')
    op.drop_constraint(None, 'designers', type_='foreignkey')
    op.drop_constraint(None, 'demands_users', type_='foreignkey')
    op.drop_constraint(None, 'demands_users', type_='foreignkey')
    op.drop_constraint(None, 'categories_users', type_='foreignkey')
    op.drop_constraint(None, 'categories', type_='foreignkey')
    op.drop_constraint(None, 'applyworks', type_='foreignkey')
    op.drop_constraint(None, 'applyforms', type_='foreignkey')
    op.drop_constraint(None, 'albums', type_='foreignkey')
    # ### end Alembic commands ###
