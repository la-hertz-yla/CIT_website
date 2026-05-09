// Register form handler
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const filiere = document.getElementById("filiere").value.trim();
    const level = document.getElementById("level").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;
    const messageDiv = document.getElementById("message");

    // Récupérer les intérêts sélectionnés
    const interestCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
    const interests = Array.from(interestCheckboxes).map(cb => cb.value);

    // Validation
    if (!firstName || !lastName || !email || !filiere || !level || !password) {
        messageDiv.textContent = "Tous les champs obligatoires doivent être remplis";
        messageDiv.className = "message error";
        return;
    }

    if (!terms) {
        messageDiv.textContent = "Vous devez accepter les conditions d'utilisation";
        messageDiv.className = "message error";
        return;
    }

    if (password !== confirmPassword) {
        messageDiv.textContent = "Les mots de passe ne correspondent pas";
        messageDiv.className = "message error";
        return;
    }

    if (password.length < 6) {
        messageDiv.textContent = "Le mot de passe doit contenir au moins 6 caractères";
        messageDiv.className = "message error";
        return;
    }

    // Disable button
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Inscription en cours...";

    try {
        const response = await fetch("/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                filiere,
                level,
                interests,
                phone: phone || null,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            messageDiv.textContent = "✓ " + data.message;
            messageDiv.className = "message success";
            document.getElementById("registerForm").reset();
            
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } else {
            messageDiv.textContent = data.message || "Erreur lors de l'inscription";
            messageDiv.className = "message error";
        }
    } catch (error) {
        console.error("Erreur:", error);
        messageDiv.textContent = "Erreur de connexion au serveur";
        messageDiv.className = "message error";
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "S'inscrire";
    }
});
