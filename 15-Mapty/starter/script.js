'use strict';


////////////////////////////////////////////////////
// Classes
class Workout {
    id = (Date.now() + '').slice(-10);
    date = new Date();

    /**
     * @param coordinates   [lat, lng]
     * @param distance      in km
     * @param duration      in min
     */
    constructor(coordinates, distance, duration) {
        this.coordinates = coordinates;
        this.distance = distance;
        this.duration = duration;
    }

    _setDescription() {
        const formatter = Intl.DateTimeFormat('en', {year: 'numeric', month: 'long', day: '2-digit'});
        const shortFormatter = Intl.DateTimeFormat('GB-en', {year: '2-digit', month: '2-digit', day: '2-digit'});
        this.description = `${this.constructor.name} on ${formatter.format(this.date)}`;
        this.shortDescription = `${this.constructor.name} on ${shortFormatter.format(this.date)}`;
    }
}

class Running extends Workout {
    type = 'running';

    constructor(coordinates, distance, duration, cadence) {
        super(coordinates, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';

    constructor(coordinates, distance, duration, elevationGain) {
        super(coordinates, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        // km/h
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

////////////////////////////////////////////////////
// App Architecture
const form = document.querySelector('.form');
const sidebar = document.querySelector('.sidebar');
const containerWorkouts = document.querySelector('.workouts');
const inputAll = document.querySelectorAll('.form__input');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
    #workouts = [];
    #map;
    #mapZoomLevel = 15;
    #mapEvent;

    constructor() {
        this._getPosition();

        // Attach event handlers
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField.bind(this));
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
        sidebar.addEventListener('click', this._hideFormAfterClick.bind(this));
    }

    _getPosition() {
        const geolocationError = function () {
            alert(`Couldn't get your position :c`)
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), geolocationError, {
                // высокая точность
                enableHighAccuracy: true
            });
        }
    }

    _loadMap(position) {
        const {latitude, longitude} = position.coords;
        const coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        // Rendering a map
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">0penStreetMap</a> contributors'
        }).addTo(this.#map);

        // Show current position
        L.marker(coords)
            .addTo(this.#map)
            .bindPopup(L.popup({
                autoClose: false,
                closeOnClick: false,
            }))
            .setPopupContent(`You're here`)
            .openPopup();

        // Handling clicks on map
        this.#map.on('click', this._showForm.bind(this));

        this._getLocalStorage();
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;

        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _hideForm() {
        Array.from(inputAll)
            .filter(i => !i.classList.contains('form__input--type'))
            .forEach(i => i.value = '');

        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
    };

    _hideFormAfterClick(e) {
        if (!e.target.closest('.form'))
            form.classList.add('hidden');
    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        e.preventDefault();
        // Get coordinates
        const {lat, lng} = this.#mapEvent.latlng;

        // Get data from forms
        let workType = inputType.value;
        let workDistance = +inputDistance.value;
        let workDuration = +inputDuration.value;

        // New workout
        let workout;

        // Helper functions
        const isValidInput = (...inputs) => inputs.every(i => i !== '');
        const isPositive = (...inputs) => inputs.every(i => i > 0);

        // Running -> Running object
        if (workType === 'running') {
            let workCadence = +inputCadence.value;

            // Data validation
            if (!isValidInput(workDistance, workDuration, workCadence) ||
                !isPositive(workDistance, workDuration, workCadence))
                return alert('Inputs must be positive numbers!');

            workout = new Running([lat, lng], workDistance, workDuration, workCadence)
        }

        // Cycling -> Cycling object
        if (workType === 'cycling') {
            let workElevation = +inputElevation.value;

            // Data validation
            if (!isValidInput(workDistance, workDuration, workElevation) ||
                !isPositive(workDistance, workDuration))
                return alert('Distance and duration must be positive numbers!');

            workout = new Cycling([lat, lng], workDistance, workDuration, workElevation);
        }

        // Add the workout to the workout array
        this.#workouts.push(workout);

        // Render a marker
        this._renderMarker(workout);

        // Hide and clear form
        this._hideForm();

        // Render on left side
        this._renderSideWorkout(workout);

        // Set local storage to all workouts
        this._setLocalStorage();
    }

    _renderMarker(workoutObj) {
        L.marker(workoutObj.coordinates)
            .addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workoutObj.type}-popup`
            }))
            .setPopupContent(`${workoutObj.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workoutObj.shortDescription}`)
            .openPopup();
    }

    _renderSideWorkout(workoutObj) {
        let html = `
            <li class="workout workout--${workoutObj.type}" data-id="${workoutObj.id}">
                <h2 class="workout__title">${workoutObj.description}</h2>
                <div class="workout__details">
                    <span class="workout__icon">${workoutObj.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span> 
                    <span class="workout__value">${workoutObj.distance}</span> 
                    <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workoutObj.duration}</span>
                    <span class="workout__unit">min</span>
                </div>
            `;

        if (workoutObj.type === 'running')
            html += ` 
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workoutObj.pace.toFixed(1)}</span> 
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span> 
                    <span class="workout__value">${workoutObj.cadence}</span> 
                    <span class="workout__unit">spm</span> 
                </div>
            </li>`

        if (workoutObj.type === 'cycling')
            html += ` 
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workoutObj.speed.toFixed(1)}</span> 
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⛰ </span> 
                    <span class="workout__value">${workoutObj.elevationGain}</span> 
                    <span class="workout__unit">m</span> 
                </div>
            </li>`

        containerWorkouts.insertAdjacentHTML("beforeend", html);
    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');
        if (!workoutEl)
            return;

        const markerCoords = this.#workouts.find(w => w.id === workoutEl.dataset.id).coordinates;
        this.#map.setView(markerCoords, this.#mapZoomLevel * 1.1, {
            animate: true,
            pan: {
                duration: 1,
            },
        });
    }

    _setLocalStorage() {
        localStorage.setItem('workoutsLS', JSON.stringify(this.#workouts));
    }

    _getLocalStorage() {

        const localData = JSON.parse(localStorage.getItem('workoutsLS'));

        if (!localData) return;

        this.#workouts = localData;
        this.#workouts.forEach(workout => {
            // Render a marker
            this._renderMarker(workout);

            // Render on left side
            this._renderSideWorkout(workout);
        });
    }

    reset() {
        localStorage.removeItem('workoutsLS');
        location.reload();
    }
}

const app = new App();









