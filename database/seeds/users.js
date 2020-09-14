
exports.seed = async function(knex) {
      return knex('users').insert([
        {username: "test", password: "test"}
      ]);
    };

