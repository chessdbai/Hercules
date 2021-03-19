SELECT
    game_id, fen, white_player_name, white_player_elo,
    black_player_name, black_player_elo,
    next_move_san, previous_move_san, eco, result
FROM %database%.%tablename%
WHERE
    regexp_like(board_state, '.{13}pbp.{6}p.{23}P.{6}PBP.{8}');