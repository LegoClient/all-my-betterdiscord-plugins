/**
 * @name FixerPlugin
 * @author Strencher
 * @version 1.0.0
 * @description Fixes Zere's library crashing discord.
 */

const predefine = function (target, prop, effect) {
    const value = target[prop];
    Object.defineProperty(target, prop, {
        get() {return value;},
        set(value) {
            Object.defineProperty(target, prop, {
                value,
                configurable: true,
                enumerable: true,
                writable: true
            });

            try {
                effect(value);
            } catch (error) {
                console.error(error);
            }

            return value;
        },
        configurable: true
    });
};

const parseVersion = version => version.split(".").reduce((c, i) => c + Number(i), 0);

predefine(window, "ZLibrary", lib => {
    const showModal = lib.Modals.showModal;

    lib.Modals.showModal = function (...args) {
        if (parseVersion(BdApi.Plugins.get("ZeresPluginLibrary")?.version ?? "") <= 8) {
            return;
        }

        return showModal.apply(this, args);
    };
});

module.exports = class FixerPlugin {
    start() {

    }

    stop() {}
}
