exports.up = (pgm) => {
    pgm.createTable('users', {
      id: { type: 'uuid', primaryKey: true },
      email: { type: 'varchar(255)', notNull: true, unique: true },
      name: { type: 'varchar(255)', notNull: true },
      phone: { type: 'varchar(20)' },
      isAdmin: { type: 'boolean', notNull: true, default: false },
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
    pgm.dropTable('users');
  };