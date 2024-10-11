exports.up = (pgm) => {
    pgm.createTable('football_reviews', {
      id: { type: 'serial', primaryKey: true },
      team1: { type: 'varchar(255)', notNull: true },
      team2: { type: 'varchar(255)', notNull: true },
      score1: { type: 'integer' },
      score2: { type: 'integer' },
      content: { type: 'text', notNull: true },
      match_type: { type: 'varchar(50)' },
      user_id: {
        type: 'uuid',
        notNull: true,
        references: '"users"',
        onDelete: 'CASCADE',
      },
      league_id: {
        type: 'integer',
        notNull: true,
        references: '"leagues"',
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
    pgm.dropTable('football_reviews');
  };