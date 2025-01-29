import os
from django.core.wsgi import get_wsgi_application
from datetime import datetime, timedelta

# Set the DJANGO_SETTINGS_MODULE environment variable to your project settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "evolve_logix.settings")

# Initialize Django application
get_wsgi_application()

# Import the necessary models
from training_log.models import MuscleGroup, Exercise
from users.models import StrengthRecord
from django.contrib.auth import get_user_model


def load_data():
    exercises_data = [
        {
            "name": "Squat",
            "description": "The barbell squat is a compound strength-training exercise that engages multiple muscle groups, including the quadriceps, hamstrings, glutes, lower back, and core. In this exercise, the individual places a barbell on their upper back, bends at the hips and knees to lower into a squat position, and then returns to a standing position. Barbell squats are fundamental for building lower body strength, improving overall stability, and are a key component of many strength-training",
            "muscle_group": [
                {
                    "name": "Quadriceps",
                    "description": "The quadriceps, or quads, are a group of four muscles located at the front of the thigh. Comprising the rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius, these muscles work together to extend the knee and play a significant role in activities like walking, running, and jumping. Strong and well-conditioned quadriceps are essential for overall lower body strength and functional movement.",
                }
            ],
        },
        {
            "name": "Bench press",
            "description": "The barbell bench press is a compound weightlifting exercise primarily targeting the pectoral muscles, deltoids, and triceps. In this exercise, the individual lies on a bench and lifts a barbell vertically, extending and flexing the arms to work the upper body. It is a fundamental strength-training movement and is often included in workout routines to enhance chest development and overall upper body strength.",
            "muscle_group": [
                {
                    "name": "Pectoral muscles",
                    "description": "The pectoral muscles, comprised of the pectoralis major and pectoralis minor, are located in the chest region. The pectoralis major is responsible for shoulder movements like flexion and adduction, while the pectoralis minor aids in scapular stabilization for activities such as pushing and pulling.",
                }
            ],
        },
        {
            "name": "Barbell Front Squat",
            "description": "The barbell front squat is a compound exercise that targets multiple muscle groups, primarily the quadriceps, hamstrings, and glutes. It also engages the core muscles for stabilization.",
            "muscle_group": [
                {
                    "name": "Quadriceps",
                    "description": "The quadriceps, or quads, are a group of four muscles located at the front of the thigh. Comprising the rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius, these muscles work together to extend the knee and play a significant role in activities like walking, running, and jumping. Strong and well-conditioned quadriceps are essential for overall lower body strength and functional movement.",
                }
            ],
        },
        {
            "name": "Hex Bar Deadlift",
            "description": "The hex bar deadlift, also known as the trap bar deadlift, is a powerful compound exercise that primarily targets the posterior chain, including the hamstrings, glutes, and lower back.",
            "muscle_group": [
                {
                    "name": "Quadriceps",
                    "description": "The quadriceps, or quads, are a group of four muscles located at the front of the thigh. Comprising the rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius, these muscles work together to extend the knee and play a significant role in activities like walking, running, and jumping. Strong and well-conditioned quadriceps are essential for overall lower body strength and functional movement.",
                }
            ],
        },
        {
            "name": "Military Press",
            "description": "The military press, also known as the overhead press, is a weightlifting exercise that primarily targets the shoulders and triceps. In this exercise, you stand with your feet shoulder-width apart and press a barbell or dumbbells overhead from shoulder height to a fully extended position. It helps in developing shoulder strength and stability, as well as working the triceps and upper back muscles.",
            "muscle_group": [
                {
                    "name": "Deltoids",
                    "description": "The shoulder muscles, also known as the deltoids, consist of three main parts: the anterior deltoid, lateral deltoid, and posterior deltoid. These muscles are responsible for various movements of the shoulder joint. The anterior deltoid assists in shoulder flexion, the lateral deltoid is involved in shoulder abduction, and the posterior deltoid contributes to shoulder extension. Together, they play a crucial role in providing shoulder strength, stability, and a wide range of motion.",
                }
            ],
        },
        {
            "name": "Lunges",
            "description": "Lunges are a versatile lower body exercise that targets several muscle groups, including the quadriceps, hamstrings, glutes, and calves. To perform lunges, step forward with one leg, lowering your hips until both knees are bent at a 90-degree angle. Then, push off the front foot to return to the starting position. Lunges help improve lower body strength, balance, and flexibility.",
            "muscle_group": [
                {
                    "name": "Quadriceps",
                    "description": "The quadriceps, or quads, are a group of four muscles located at the front of the thigh. Comprising the rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius, these muscles work together to extend the knee and play a significant role in activities like walking, running, and jumping. Strong and well-conditioned quadriceps are essential for overall lower body strength and functional movement.",
                }
            ],
        },
        {
            "name": "Barbell bent-over row",
            "description": "The barbell bent-over row is a compound exercise that primarily targets the muscles of the upper back. To perform this exercise, bend at the waist, keep your back straight, and lift a barbell from the floor to your lower chest by pulling your elbows back. The movement engages the muscles of the upper back, including the latissimus dorsi, rhomboids, and traps.",
            "muscle_group": [
                {
                    "name": "Lats",
                    "description": "The lats are large, flat muscles that extend from the lower back to the upper arm. Strengthening the lats not only contributes to a well-defined back but also aids in various upper body movements, such as pulling and lifting.",
                }
            ],
        },
        {
            "name": "Bench Press - Feet Up",
            "description": "The feet up bench press is a variation of the standard bench press exercise where you elevate your feet off the ground while performing the lift. This variation places increased emphasis on the upper body, particularly the chest, and reduces the involvement of the lower body. By removing the leg drive, which contributes to power in the standard bench press, you can isolate the chest muscles more effectively.",
            "muscle_group": [
                {
                    "name": "Pectoral muscles",
                    "description": "The pectoral muscles, comprised of the pectoralis major and pectoralis minor, are located in the chest region. The pectoralis major is responsible for shoulder movements like flexion and adduction, while the pectoralis minor aids in scapular stabilization for activities such as pushing and pulling.",
                }
            ],
        },
        {
            "name": "Leg Extensions - Machine",
            "description": "Machine Leg Extensions\r\n\r\nA machine leg extension is a weight training exercise that primarily targets the quadriceps muscles (front of the thighs). You sit on a machine, position your legs under a padded bar, and extend them against resistance. This exercise isolates the quadriceps, allowing for focused muscle development.",
            "muscle_group": [
                {
                    "name": "Quadriceps",
                    "description": "The quadriceps, or quads, are a group of four muscles located at the front of the thigh. Comprising the rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius, these muscles work together to extend the knee and play a significant role in activities like walking, running, and jumping. Strong and well-conditioned quadriceps are essential for overall lower body strength and functional movement.",
                }
            ],
        },
        {
            "name": "Deadlift",
            "description": "The deadlift is a weight training exercise in which a loaded barbell or bar is lifted off the ground to the level of the hips, torso perpendicular to the floor, before being placed back on the ground. It is one of the three powerlifting exercises, along with the squat and bench press,[1] as well as a frequent lift in strongman.",
            "muscle_group": [
                {
                    "name": "Gluteus",
                    "description": "The gluteus maximus is the main extensor muscle of the hip in humans. It is the largest and outermost of the three gluteal muscles and makes up a large part of the shape and appearance of each side of the hips. It is the single largest muscle in the human body.",
                },
                {
                    "name": "Hamstring",
                    "description": "In human anatomy, a hamstring (/ˈhæmstrɪŋ/) is any one of the three posterior thigh muscles between the hip and the knee (from medial to lateral: semimembranosus, semitendinosus and biceps femoris).",
                },
                {
                    "name": "Lower Back",
                    "description": "The lower back muscles, also known as lumbar muscles, support your spine and enable various movements.",
                },
            ],
        },
        {
            "name": "Sumo deadlift",
            "description": "The sumo deadlift is a variation of the barbell deadlift often adopted by powerlifters. When performing a sumo deadlift, the lifter adopts a wide stance, and grips the bar between the legs.",
            "muscle_group": [
                {
                    "name": "Gluteus",
                    "description": "The gluteus maximus is the main extensor muscle of the hip in humans. It is the largest and outermost of the three gluteal muscles and makes up a large part of the shape and appearance of each side of the hips. It is the single largest muscle in the human body.",
                },
                {
                    "name": "Hamstring",
                    "description": "In human anatomy, a hamstring (/ˈhæmstrɪŋ/) is any one of the three posterior thigh muscles between the hip and the knee (from medial to lateral: semimembranosus, semitendinosus and biceps femoris).",
                },
                {
                    "name": "Lower Back",
                    "description": "The lower back muscles, also known as lumbar muscles, support your spine and enable various movements.",
                },
            ],
        },
        {
            "name": "Pull-up",
            "description": "A pull-up is a bodyweight exercise where you lift your entire body up to a bar using your arms. It primarily targets the back muscles, including the latissimus dorsi, but also engages the biceps, forearms, and core.",
            "muscle_group": [
                {
                    "name": "Lats",
                    "description": "The lats are large, flat muscles that extend from the lower back to the upper arm. Strengthening the lats not only contributes to a well-defined back but also aids in various upper body movements, such as pulling and lifting.",
                }
            ],
        },
        {
            "name": "Biceps Curl - Barbell",
            "description": "A biceps curl is an exercise that targets the biceps muscles in the front of your upper arm. It involves flexing your elbow and lifting a weight towards your shoulder.",
            "muscle_group": [
                {
                    "name": "Biceps",
                    "description": "The biceps is a muscle located on the front of the upper arm. It consists of two heads: the short head and the long head. The primary function of the biceps is to flex the elbow, bringing the forearm closer to the upper arm.",
                }
            ],
        },
        {
            "name": "Biceps Curl - Dumbbell",
            "description": "A biceps curl is an exercise that targets the biceps muscles in the front of your upper arm. It involves flexing your elbow and lifting a weight towards your shoulder.",
            "muscle_group": [
                {
                    "name": "Biceps",
                    "description": "The biceps is a muscle located on the front of the upper arm. It consists of two heads: the short head and the long head. The primary function of the biceps is to flex the elbow, bringing the forearm closer to the upper arm.",
                }
            ],
        },
    ]

    for exercise_data in exercises_data:
        exercise, created = Exercise.objects.get_or_create(
            name=exercise_data["name"],
            defaults={"description": exercise_data["description"]},
        )
        for muscle_group_data in exercise_data["muscle_group"]:
            muscle_group, mg_created = MuscleGroup.objects.get_or_create(
                name=muscle_group_data["name"],
                defaults={"description": muscle_group_data["description"]},
            )
            exercise.muscle_group.add(muscle_group)

    print("Sample data loaded successfully.")


if __name__ == "__main__":
    load_data()
