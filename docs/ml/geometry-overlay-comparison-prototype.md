# Geometry Overlay Comparison Prototype

Step 30 introduces the visual comparison layout that matches the product idea:

1. show Cane Corso reference geometry;
2. show the user photo next to it;
3. run the photo quality gate;
4. block comparison if the image is not suitable;
5. if accepted or limited, show a geometry overlay and ratio evidence.

The reference is not a single dog photo. It is a proportional geometry guide based on breed-reference relationships such as body length / height, chest depth / height, head length / height, and muzzle / skull relation.

## Why this matters

A visual match score without a photo gate would be misleading. A standing side-body photo can support body geometry comparison; a head profile photo can support head geometry comparison; a bad angle or cropped photo should not receive a reliable match score.

## User-facing language

The result must be described as visual similarity to Cane Corso type, not proof of pedigree, breed purity, health, or official status.

## Future model path

The current step is a UI and logic prototype. A trained version needs:

- photo readiness model;
- photo type classifier;
- landmark detection model;
- visual similarity model;
- reference geometry fusion layer.
