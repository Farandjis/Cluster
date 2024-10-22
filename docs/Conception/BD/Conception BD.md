Florent VASSEUR--BERLIOUX, Tom BOGAERT, Baptiste FOURNIE, William HERUBEL, Matthieu FARANDJIS<br>
INF3-FI

<div align="center">
<img height="95" width="400" src="/img/IUT_Velizy_Villacoublay_logo_2020_ecran.png" title="logo uvsq vélizy"/>

# SAÉ S5 BD Design
</div>

<br><br><br><br><br><br><br>

## Table of Contents

### [I – MCD](#p1)
   - <b>[Figure 1: MCD Diagram](#fg1)</b>
### [II – MLD](#p2)
   - <b>[Figure 2: MLD Diagram](#fg2)</b>

<br><br><br><br><br><br><br>


------------------------------------------------------------------------------------------------------------------------
### <a name="p1"></a>I – MCD
<br><br>

**Table `UTILISATEUR`:**

This table describes the user information.
- `user`: The username. It is the primary key of the table.
- `password`: The password associated with the user, used for authentication.
- `role`: The role of the user.

<br><br>

**Table `HISTORY`:**

This table stores information about the calculations and actions performed by users.

- `id_history`: A unique identifier for each history record. This is the primary key.
- `calcul`: A column to store calculations or computed information.
- `module`: Indicates which module the calculation is related to or the context of the action.
- `user`: A foreign key that references the `User` field in the `Utilisateur` table, showing which user is linked to this history record.

<br><br>

**Table `LOG_CONNECTION`:**

This table records unsuccessful login attempts to the system.

- `id_connection`: A unique identifier for each login attempt. This is the primary key.
- `password_tester`: The password used during this login attempt.
- `date`: The date and time of the login attempt. This column uses the `TIMESTAMP` type which, by default, records the current time automatically.
- `user_tester`: A foreign key that references the `User` field in the `Utilisateur` table, indicating which user made the login attempt.


<br><br>

<b> Relationship between the tables:</b>

- The relationship between ``UTILISATEUR`` and ``HISTORY`` is "one-to-many", modeled by the foreign key User in the ``HISTORY`` table.

<br><br>

<img height="300" width="400" src="./Modèles UML/Sae_Mcd.png" title="Modèle MCD de la base de données"/>

<i><a name="fg1"></a>Figure 1: MCD Diagram.</i>

------------------------------------------------------------------------------------------------------------------------
### <a name="p2"></a>II – MLD
<br><br>

<b> Explanation of specific points for MariaDB:</b>

- Foreign keys with constraints:<br>
A special rule will ensures that when a user is deleted from the ``UTILISATEUR`` table, all related rows in the ``HISTORY`` table are also deleted.<br>
In the same way, a rule that automatically updates foreign key values if the username is changed in the ``UTILISATEUR`` table will be add.

- Auto-increment:<br>
An auto-increment function will be used to automatically generate a unique ID for each new record in the ``HISTORY`` and ``LOG_CONNECTION`` tables.<br>
These ID are the primary keys of these tables.

<br><br>

<img height="90" width="400" src="./Modèles UML/Sae_Mld.png" title="Modèle MLD de la base de données"/>

<i><a name="fg2"></a>Figure 2: MLD Diagram.</i>
