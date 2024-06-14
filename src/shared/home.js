<div className="home">
      <div className="justify-center">
        <h1 className="text-white font-bold text-center p-5 ml-auto">
          The #1 site real estate
          <br />
          Professionals trust*
        </h1>

        <div className="flex items-center justify-center min-h-screen">
          <div
            id="form"
            className="bg-white lg:w-3/4 w-full grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-2 p-3 rounded-xl"
          >
            <div className="w-full">
              <h2 className="text-black ">LOCATION</h2>
              <input
                type="text"
                placeholder="Enter Location"
                value={inputValue}
                onChange={handleChange}
                onKeyPress={handleEnter}
                className="location_input"
                list="city-suggestions"
              />
              <datalist id="city-suggestions">
                {suggestions.map((city) => (
                  <option key={city.id} value={`${city.city}, ${city.state}`} />
                ))}
              </datalist>
            </div>

            <div className="w-full">
              <h2 className="text-black ">TYPE</h2>
              <select
                name="selectOption"
                id="selectOption"
                className="bg-white p-2 border-b-2 w-full mt-2 border-gray-300 text-gray-500 text-md"
                value={selectedType}
                onChange={handleTypeChange}
              >
                <option value="" disabled>
                  Select Property
                </option>
                <option value="Flats">Flats</option>
                <option value="Homes">Homes</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>

            <div className="w-full">
              <button
                className="bg-orange-600 hover:bg-black text-lg p-2 mt-4 w-full text-white font-semibold rounded-xl cursor-pointer transform hover:scale-110 transition-transform duration-300"
                onClick={handleSearch}
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>