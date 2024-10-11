exports.up = (pgm) => {
    pgm.createTable('leagues', {
      id: { type: 'serial', primaryKey: true },
      name: { type: 'varchar(255)', notNull: true },
      sport_type: { type: 'varchar(50)', notNull: true },
      logo: { type: 'text' },
      user_id: {
        type: 'uuid',
        notNull: true,
        references: '"users"',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
      },
      updated_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('leagues');
  };