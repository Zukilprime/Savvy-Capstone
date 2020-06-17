export default () => `<div>
<section>
<h1 id="registrationTitle">New User Registration</h1>
    <form id="userForm">
      <fieldset>
      <legend></legend>
      <section id="userInput">
        <p>
          <label>User Name</label>
          <input type = "text"
                 id = "myText"
                 value = "Username" />
        </p>
        <p>
          <label>Email</label>
          <input type = "text"
                 id = "myText"
                 value = "Email" />
        </p>
        <p>
          <label>Password</label>
          <input type = "password"
                  id = "myPwd"
                  value = "secret" />
        </p>
      </section>
      <section id="daySelectBox">
        <input type="checkbox">
        <label class="container" id="selectionBox">Monday
        <span class="checkmark"></span>
        </label>

        <input type="checkbox">
        <label class="container" id="selectionBox">Tuesday
        <span class="checkmark" ></span>
        </label>

        <input type="checkbox">
        <label class="container" id="selectionBox">Wednesday
        <span class="checkmark"></span>
        </label>

        <input type="checkbox">
        <label class="container" id="selectionBox">Thursday
        <span class="checkmark"></span>
        </label>

        <input type="checkbox">
        <label class="container" id="selectionBox">Friday
        <span class="checkmark"></span>
        </label>

        <input type="checkbox">
        <label class="container" id="selectionBox">Saturday
        <span class="checkmark"></span>
        </label>

        <input type="checkbox">
        <label class="container" id="selectionBox">Sunday
        <span class="checkmark"></span>
        </label>
      </section>
      <div id="spacer"><div>
      <section id="timeSlots">
      <input type="checkbox">
        <label class="container" id="selectionBox">10 AM
        <span class="checkmark"></span>
        </label>
        <input type="checkbox">
        <label class="container" id="selectionBox">11 AM
        <span class="checkmark"></span>
        </label>
        <input type="checkbox">
        <label class="container" id="selectionBox">12 PM
        <span class="checkmark"></span>
        </label>
        <input type="checkbox">
        <label class="container" id="selectionBox">1 PM
        <span class="checkmark"></span>
        </label>
        <input type="checkbox">
        <label class="container" id="selectionBox">2 PM
        <span class="checkmark"></span>
        </label>
        <input type="checkbox">
        <label class="container" id="selectionBox">3 PM
        <span class="checkmark"></span>
        </label>
        <input type="checkbox">
        <label class="container" id="selectionBox">4 PM
        <span class="checkmark"></span>
        </label>
        <input type="checkbox">
        <label class="container" id="selectionBox">5 PM
        <span class="checkmark"></span>
        </label>
        <input type="checkbox">
        <label class="container" id="selectionBox">6 PM
        <span class="checkmark"></span>
        </label>
        <input type="checkbox">
        <label class="container" id="selectionBox">7 PM
        <span class="checkmark"></span>
        </label>
        <input type="checkbox">
        <label class="container" id="selectionBox">8 PM
        <span class="checkmark"></span>
        </label>
      </section>
      <div id="spacer"><div>
      <div id="spacer"><div>
      <div id="spacer"><div>
      <div id="spacer"><div>
      <section id="buttons">
      <input class="submit" type="button" value="Submit">
      <input class="clear" type="button" value="Clear">
      </section>
      </fieldset>
    </form>
</section>
</div>
`;
