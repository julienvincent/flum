# 1.0.2 (July 20th 2016)

+ Calling `getContext` no longer wraps api in a function.

# 1.0.1 (July 20th 2016)

+ Form was returning a function when used in react-native. Fixed.

# 1.0.0 (July 20th 2016)

+ `react` is now a peer dependency instead of a dependency.
+ The `getFields` prop has been replaced with `getContext` which provides the context api externally.

# 0.2.4 - 0.2.5 (July 10th 2016)

+ Removed `form` wrapped while used in `react-native`.

# 0.2.3 (June 27th 2016)

+ Can now host state outside of form if required.
+ Context method to fetch state renamed from `state()` to `getState()`.

# 0.2.2 (June 23rd 2016)

+ Not providing validation no longer breaks form on submit. 0.2.1 did not completely fix.

# 0.2.1 (June 22nd 2016)

+ Not providing validation no longer breaks form.
+ onSubmit state checks now merge namespaced properties.

# 0.2.0 (June 17th 2016)

+ Renamed library to flum.
+ Wrote some docs.
+ Validators can now return true or false.

# 0.1.6 (June 11th 2016)

+ Added .flatten() to state which will flat map `value` properties.