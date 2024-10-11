exports.up = (pgm) => {
    pgm.createTable('main_background_images', {
      id: { type: 'serial', primaryKey: true },
      image: { type: 'text', notNull: true },
      altText: { type: 'varchar(255)' },
      active: { type: 'boolean', notNull: true, default: true },
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
  
    pgm.createTable('cricket_background_images', {
      id: { type: 'serial', primaryKey: true },
      image: { type: 'text', notNull: true },
      altText: { type: 'varchar(255)' },
      active: { type: 'boolean', notNull: true, default: true },
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
  
    pgm.createTable('football_background_images', {
      id: { type: 'serial', primaryKey: true },
      image: { type: 'text', notNull: true },
      altText: { type: 'varchar(255)' },
      active: { type: 'boolean', notNull: true, default: true },
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
    pgm.dropTable('main_background_images');
    pgm.dropTable('cricket_background_images');
    pgm.dropTable('football_background_images');
  };