function calculate() {
    const H = parseFloat(document.getElementById('height').value);
    const L = parseFloat(document.getElementById('length').value);
    const D = parseFloat(document.getElementById('diameter').value) / 1000; // Convertir en mètres
    const densitySteel = parseFloat(document.getElementById('density').value);
    const densityAir = 1.225; // Densité de l'air en kg/m³
    const windSpeed = parseFloat(document.getElementById('windSpeed').value);
    const d = parseFloat(document.getElementById('deflection').value); // Flèche en mètres
    const FS = parseFloat(document.getElementById('safetyFactor').value); // Facteur de sécurité
    const measuredTensionT = parseFloat(document.getElementById('measuredTension').value); // Tension mesurée en tonnes

    // Calcul de la surface projetée (A_proj)
    const A_proj = Math.PI * Math.pow(D / 2, 2);

    // Calcul de la charge de vent
    const windLoad = 0.5 * densityAir * Math.pow(windSpeed, 2) * A_proj;

    // Calcul du poids linéaire du hauban
    const linearWeight = densitySteel * Math.PI * Math.pow(D / 2, 2) * L;

    // Calcul de la tension théorique
    const T_t = (linearWeight + windLoad) * L / (2 * d);

    // Calcul de la tension admissible
    const T_a = T_t / FS;

    // Calcul des limites inférieure et supérieure de la tension admissible
    const lowerLimit = T_a * 0.90;  // Limite inférieure à 90% de la tension admissible
    const upperLimit = T_a * 1.10;  // Limite supérieure à 110% de la tension admissible

    // Détermination de la recommandation
    let recommendation = "";
    let resultClass = "";

    if (measuredTensionT < lowerLimit / 1000) {
        recommendation = "Attention : La tension mesurée est inférieure à la limite inférieure admissible selon la norme TIA-222. Le hauban pourrait être relâché.";
        resultClass = "red-text";
    } else if (measuredTensionT > upperLimit / 1000) {
        recommendation = "Attention : La tension mesurée dépasse la limite supérieure admissible selon la norme TIA-222. Vérifiez l'intégrité des haubans.";
        resultClass = "red-text";
    } else {
        recommendation = "Conformité : La tension mesurée est dans les limites admissibles de la norme TIA-222.";
        resultClass = "green-text";
    }

    // Affichage des résultats
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Résultats</h3>
        <p>Tension théorique (T_t) : ${(T_t / 1000).toFixed(2)} tonnes</p>
        <p>Tension admissible (T_a) : ${(T_a / 1000).toFixed(2)} tonnes</p>
        <p>Limite inférieure de la tension admissible (T_a_min) : ${(lowerLimit / 1000).toFixed(2)} tonnes</p>
        <p>Limite supérieure de la tension admissible (T_a_max) : ${(upperLimit / 1000).toFixed(2)} tonnes</p>
        <p class="${resultClass}">${recommendation}</p>
        <p>Interprétation : La tension mesurée (T_m) est de ${measuredTensionT} tonnes.</p>
        <p>La tension mesurée doit être comprise entre ${(lowerLimit / 1000).toFixed(2)} kg et ${(upperLimit / 1000).toFixed(2)} kg pour être considérée comme conforme aux normes de sécurité.</p>
    `;
}
