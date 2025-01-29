#!/bin/sh

echo "Waiting for database connection..."
sleep 5

# Apply database migrations
echo "Applying database migrations..."
python manage.py makemigrations
python manage.py migrate

# Load initial data
python load_initial_data.py

# Create superuser
echo "Creating superuser..."
python manage.py createsuperuser --noinput --email admin@gmail.com --user_name admin

# Set superuser password
echo "from django.contrib.auth import get_user_model; User = get_user_model(); user = User.objects.get(user_name='admin'); user.set_password('admin'); user.save()" | python manage.py shell

# Start the server
echo "Starting the server..."
exec "$@"
