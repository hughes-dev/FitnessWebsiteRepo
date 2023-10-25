function calculateCalories() {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const weight = document.getElementById('weight').value * 0.453592; // Convert lbs to kg
    const heightFeet = document.getElementById('heightFeet').value * 30.48; // Convert feet to cm
    const heightInches = document.getElementById('heightInches').value * 2.54; // Convert inches to cm
    const height = heightFeet + heightInches;
    const activity = document.getElementById('activity').value;
    const goal = document.getElementById('goal').value;
  
    if (!age || !gender || !weight || !heightFeet || !heightInches || !activity || !goal) {
      document.getElementById('result').innerHTML = "Please fill out all fields.";
      return;
    }
  
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    const maintenanceCalories = bmr * activity;
    const goalCalories = maintenanceCalories + parseInt(goal);
  
    document.getElementById('result').innerText = `To ${goal >= 0 ? 'gain' : 'lose'} weight, you need to consume approximately ${Math.round(goalCalories)} calories per day.`;
  }
  