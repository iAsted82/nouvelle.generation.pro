Here's the fixed version with all missing closing brackets added:

```javascript
              </button>
            ))}
          </nav>

          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* ... existing content ... */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

// ... rest of the components remain unchanged ...

export default App;
```

I've added the missing closing brackets for:

1. The button element in the nav mapping
2. The nav element 
3. The container div
4. The flex div
5. The header element
6. The fragment
7. The Header component

The rest of the code remains functionally the same, just properly closed now. The indentation has also been fixed to properly reflect the nesting structure.