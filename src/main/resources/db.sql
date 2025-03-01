# -- Insert Persons
# INSERT IGNORE INTO persons (person_name, location, action) VALUES
#                                                                ('Alice', 'Living Room', 'Watching TV'),
#                                                                ('Bob', 'Kitchen', 'Cooking'),
#                                                                ('Charlie', 'Bedroom', 'Sleeping'),
#                                                                ('Diana', 'Bathroom', 'Showering'),
#                                                                ('Eve', 'Study Room', 'Reading'),
#                                                                ('Frank', 'Fruit Shop', 'Buying fruits'),
#                                                                ('Grace', 'Lawn', 'Gardening'),
#                                                                ('Hank', 'Living Room', 'Talking on phone'),
#                                                                ('Ivy', 'Kitchen', 'Eating'),
#                                                                ('Jack', 'Bedroom', 'Playing games'),
#                                                                ('Karen', 'Bathroom', 'Brushing teeth'),
#                                                                ('Leo', 'Study Room', 'Writing'),
#                                                                ('Mona', 'Fruit Shop', 'Selling fruits'),
#                                                                ('Nina', 'Lawn', 'Watering plants'),
#                                                                ('Oscar', 'Living Room', 'Listening to music');
#
# -- Insert PersonRooms
# INSERT IGNORE INTO personrooms (person_name, room_type, room_contents) VALUES
#                                                                            ('Alice', 'Living Room', 'Sofa, TV, Coffee Table'),
#                                                                            ('Bob', 'Kitchen', 'Refrigerator, Oven, Sink'),
#                                                                            ('Charlie', 'Bedroom', 'Bed, Wardrobe, Desk'),
#                                                                            ('Diana', 'Bathroom', 'Shower, Toilet, Sink'),
#                                                                            ('Eve', 'Study Room', 'Bookshelf, Desk, Computer'),
#                                                                            ('Frank', 'Fruit Shop', 'Fruits, Cash Register'),
#                                                                            ('Grace', 'Lawn', 'Grass, Plants, Garden Tools'),
#                                                                            ('Hank', 'Living Room', 'Sofa, TV, Coffee Table'),
#                                                                            ('Ivy', 'Kitchen', 'Refrigerator, Oven, Sink'),
#                                                                            ('Jack', 'Bedroom', 'Bed, Wardrobe, Desk'),
#                                                                            ('Karen', 'Bathroom', 'Shower, Toilet, Sink'),
#                                                                            ('Leo', 'Study Room', 'Bookshelf, Desk, Computer'),
#                                                                            ('Mona', 'Fruit Shop', 'Fruits, Cash Register'),
#                                                                            ('Nina', 'Lawn', 'Grass, Plants, Garden Tools'),
#                                                                            ('Oscar', 'Living Room', 'Sofa, TV, Coffee Table');
#
# -- Insert Witness Statements
# INSERT IGNORE INTO witnessstatements (room_type, time, statement) VALUES
#                                                                       ('Living Room', '2023-10-01 10:00:00', 'Saw someone suspicious near the TV.'),
#                                                                       ('Kitchen', '2023-10-01 10:05:00', 'Heard noises from the fridge.'),
#                                                                       ('Bedroom', '2023-10-01 10:10:00', 'Found the window open.'),
#                                                                       ('Bathroom', '2023-10-01 10:15:00', 'Noticed water on the floor.'),
#                                                                       ('Study Room', '2023-10-01 10:20:00', 'Saw someone looking through the books.'),
#                                                                       ('Fruit Shop', '2023-10-01 10:25:00', 'Noticed missing fruits.'),
#                                                                       ('Lawn', '2023-10-01 10:30:00', 'Saw footprints leading to the house.');
#
# -- Insert Locations
# INSERT IGNORE INTO locations (location_name, camera_id) VALUES
#                                                             ('Living Room', 1),
#                                                             ('Kitchen', 2),
#                                                             ('Bedroom', 3),
#                                                             ('Bathroom', 4),
#                                                             ('Study Room', 5),
#                                                             ('Fruit Shop', 6),
#                                                             ('Lawn', 7);
#
# -- Insert Cameras
# INSERT IGNORE INTO camera (camera_id, status, footage) VALUES
#                                                            (1, 'Working', 'Footage of suspicious activity'),
#                                                            (2, 'Not Working', 'No footage available'),
#                                                            (3, 'Working', 'Footage of open window'),
#                                                            (4, 'Working', 'Footage of water on floor'),
#                                                            (5, 'Not Working', 'No footage available'),
#                                                            (6, 'Working', 'Footage of missing fruits'),
#                                                            (7, 'Working', 'Footage of footprints');