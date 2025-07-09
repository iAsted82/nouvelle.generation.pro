Here's the fixed version with all missing closing brackets added:

```javascript
// The main issues were in the Header component where some brackets were missing. Here are the fixes:

// In the mobile menu section, several closing brackets were missing:
              <button
                onClick={() => {
                  setShowForms(true);
                  setIsMenuOpen(false);
                }}
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors text-left"
              ></button> {/* Added closing tag */}
              </div> {/* Added closing div */}
          </nav>
        </div>
      </div>

// In the button onClick handlers, some were duplicated and needed to be merged:
            <button 
              onClick={() => {
                window.location.href = '#inscription';
                setShowRegistration(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 animate-pulse"
            >
              Inscrivez-vous maintenant
            </button>

// The rest of the file was properly closed and structured. These were the main fixes needed to ensure all brackets were properly matched and closed.
```

The file should now be properly formatted with all brackets matched and closed correctly.